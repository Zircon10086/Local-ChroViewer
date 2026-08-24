"""本地谱面库索引:BSOR songHash → CustomLevels 文件夹。

匹配口径(SongCore Utilities/Hashing.cs,与游戏内一致):
    SHA1(info.dat 字节 + 按 _difficultyBeatmapSets 顺序的各难度文件字节) → 大写 HEX

索引优先级:
1. SongHashData.dat(游戏自产缓存,UserData/SongCore/SongHashData.dat,秒建)
2. 全量扫描计算(首扫慢,JSON 缓存 + 文件夹 mtime 跳过未变项)

hash 算法源自 SongCore(MIT),本文件为独立实现。
"""
from __future__ import annotations

import hashlib
import json
import pathlib
import threading
import time
from typing import Callable, Optional

_HASH_CACHE_VERSION = 1


def _find_ci(folder: pathlib.Path, name: str) -> Optional[pathlib.Path]:
    target = name.lower()
    try:
        for p in folder.iterdir():
            if p.is_file() and p.name.lower() == target:
                return p
    except OSError:
        return None
    return None


def read_level_info(folder: pathlib.Path) -> Optional[dict]:
    """读 info.dat(v2/v3 字段兼容),返回难度文件顺序与文件名。"""
    info_path = _find_ci(folder, "info.dat")
    if info_path is None:
        return None
    try:
        raw = json.loads(info_path.read_bytes().decode("utf-8-sig"))
    except (json.JSONDecodeError, OSError):
        return None

    def g(*keys, default=None):
        for k in keys:
            if k in raw:
                return raw[k]
        return default

    files: list[str] = []
    sets = g("_difficultyBeatmapSets", "difficultyBeatmapSets", default=[]) or []
    for s in sets:
        for d in s.get("_difficultyBeatmaps") or s.get("difficultyBeatmaps") or []:
            fname = d.get("_beatmapFilename") or d.get("beatmapFilename") or ""
            if fname:
                files.append(fname)
    return {
        "raw": raw,
        "beatmap_files": files,
        "song_name": g("_songName", "songName", default=""),
        "mapper": g("_levelAuthorName", "levelAuthorName", default=""),
    }


def compute_level_hash(folder: pathlib.Path, info: Optional[dict] = None) -> Optional[str]:
    """SongCore 算法计算谱面 hash(大写 HEX)。"""
    info_path = _find_ci(folder, "info.dat")
    if info_path is None:
        return None
    if info is None:
        info = read_level_info(folder)
        if info is None:
            return None
    h = hashlib.sha1()
    try:
        h.update(info_path.read_bytes())
    except OSError:
        return None
    for fname in info["beatmap_files"]:
        p = _find_ci(folder, fname)
        if p is not None:
            try:
                h.update(p.read_bytes())
            except OSError:
                continue
    return h.hexdigest().upper()


def folder_short_key(folder_name: str) -> Optional[str]:
    """从文件夹名解析 BeatSaver 风格 5 位 key(如 '19d17 (Song - Mapper)')。"""
    head = folder_name.split(" ", 1)[0].strip()
    if head and len(head) <= 6 and all(c in "0123456789abcdef" for c in head.lower()):
        return head.lower()
    return None


class MapIndex:
    """hash → 文件夹 的索引,JSON 缓存 + mtime 跳过。"""

    def __init__(self, cache_file: pathlib.Path):
        self.cache_file = cache_file
        self._lock = threading.Lock()
        self._by_hash: dict[str, dict] = {}      # hash -> {path, mtime, key, song_name}
        self._by_path: dict[str, str] = {}       # path -> hash(文件夹 mtime 复用)
        self._by_key: dict[str, str] = {}        # 5位key(小写) -> hash
        self._levels_dir: Optional[pathlib.Path] = None
        self._loaded = False
        self._songcore_cache_path: Optional[pathlib.Path] = None

    # ---------- 路径 ----------
    def set_levels_dir(self, levels_dir: Optional[pathlib.Path]) -> None:
        with self._lock:
            self._levels_dir = pathlib.Path(levels_dir) if levels_dir else None
            self._loaded = False

    def set_songcore_cache(self, path: Optional[pathlib.Path]) -> None:
        self._songcore_cache_path = pathlib.Path(path) if path else None

    def levels_dir(self) -> Optional[pathlib.Path]:
        return self._levels_dir

    # ---------- 持久化 ----------
    def load(self) -> None:
        if self._loaded or not self.cache_file.exists():
            return
        try:
            data = json.loads(self.cache_file.read_text(encoding="utf-8"))
            if data.get("version") != _HASH_CACHE_VERSION:
                return
            self._by_hash = {
                h: entry for h, entry in data.get("maps", {}).items()
                if isinstance(entry, dict) and entry.get("path")
            }
            self._by_path = {entry["path"]: h for h, entry in self._by_hash.items()}
            self._by_key = {
                k.lower(): h for h, e in self._by_hash.items()
                if (k := e.get("key"))
            }
            self._loaded = True
        except (json.JSONDecodeError, OSError):
            self._loaded = True  # 损坏缓存不阻塞,下次扫描重建

    def save(self) -> None:
        try:
            self.cache_file.parent.mkdir(parents=True, exist_ok=True)
            payload = {
                "version": _HASH_CACHE_VERSION,
                "maps": self._by_hash,
            }
            self.cache_file.write_text(json.dumps(payload), encoding="utf-8")
        except OSError:
            pass

    # ---------- 查询 ----------
    def resolve(self, song_hash: str) -> Optional[dict]:
        h = song_hash.upper()
        with self._lock:
            self.load()
            entry = self._by_hash.get(h)
        if entry is None:
            return None
        p = pathlib.Path(entry["path"])
        return entry if p.exists() else None

    def resolve_by_key(self, key: str) -> Optional[dict]:
        with self._lock:
            self.load()
            h = self._by_key.get(key.lower())
        return self.resolve(h) if h else None

    # ---------- SongHashData.dat ----------
    def load_songcore_cache(self) -> dict[str, str]:
        """返回 {folder_name: hash}(SongHashData.dat 是 JSON,key 为 Windows 路径)。"""
        out: dict[str, str] = {}
        if not self._songcore_cache_path or not self._songcore_cache_path.exists():
            return out
        try:
            data = json.loads(self._songcore_cache_path.read_text(encoding="utf-8-sig"))
        except (json.JSONDecodeError, OSError):
            return out
        for path_key, v in data.items():
            if not isinstance(v, dict):
                continue
            song_hash = v.get("songHash") or v.get("SongHash") or ""
            if not song_hash:
                continue
            folder_name = pathlib.PureWindowsPath(path_key).name
            if folder_name:
                out[folder_name] = song_hash.upper()
        return out

    # ---------- 扫描 ----------
    def scan(self, progress_cb: Optional[Callable[[int, int, str], None]] = None) -> dict:
        """扫描 CustomLevels 重建索引。返回统计。"""
        stats = {"scanned": 0, "from_songcore_cache": 0, "computed": 0,
                 "reused": 0, "errors": 0, "duration_sec": 0.0}
        t0 = time.time()
        with self._lock:
            self.load()
            if self._levels_dir is None or not self._levels_dir.exists():
                stats["error"] = f"CustomLevels 不存在: {self._levels_dir}"
                return stats
            sc_cache = self.load_songcore_cache()
            folders = [p for p in self._levels_dir.iterdir() if p.is_dir()]
            total = len(folders)
            for i, folder in enumerate(folders):
                if progress_cb and (i % 100 == 0 or i == total - 1):
                    progress_cb(i + 1, total, folder.name)
                stats["scanned"] += 1
                try:
                    self._process_folder(folder, sc_cache, stats)
                except Exception:  # 单个谱面失败不中断整轮
                    stats["errors"] += 1
            self._loaded = True
            self.save()
        stats["duration_sec"] = round(time.time() - t0, 2)
        return stats

    def _process_folder(self, folder: pathlib.Path, sc_cache: dict[str, str], stats: dict) -> None:
        try:
            mtime = folder.stat().st_mtime
        except OSError:
            stats["errors"] += 1
            return
        song_hash = sc_cache.get(folder.name)
        source = "songcore_cache"
        if not song_hash:
            existing_hash = self._by_path.get(str(folder))
            existing = self._by_hash.get(existing_hash) if existing_hash else None
            if existing and abs(float(existing.get("mtime", 0)) - mtime) < 1.0:
                stats["reused"] += 1
                return
            info = read_level_info(folder)
            if info is None:
                stats["errors"] += 1
                return
            song_hash = compute_level_hash(folder, info)
            if not song_hash:
                stats["errors"] += 1
                return
            stats["computed"] += 1
            source = "computed"
        else:
            stats["from_songcore_cache"] += 1
        entry = {
            "path": str(folder),
            "mtime": mtime,
            "key": folder_short_key(folder.name),
            "song_name": "",
            "source": source,
        }
        self._by_hash[song_hash] = entry
        self._by_path[str(folder)] = song_hash
        if entry["key"]:
            self._by_key[entry["key"]] = song_hash

    @staticmethod
    def _folder_key_of(folder: pathlib.Path) -> str:
        return str(folder)
