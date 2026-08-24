"""BSOR 轻量信息提取:只读 info 段的 songHash / mapHash,完整解析留给前端。

两种已知布局(均以魔数 0x442D3D69 + 版本字节 + tag 0 开头):

A. 标准 BSOR(ScoreSaber / BS-Open-Replay 原版):
   version(i32) songName songAuthor levelAuthor beatmapCharacteristic difficulty
   songLength(f32) songHash levelId ...

B. BeatLeader 0.9.33+(官方前端 parse-beatleader.ts 对齐):
   modVersion(game 版本字符串) gameVersion timestamp playerId playerName
   platform trackingSystem hmd controller mapHash ...
   (playerName 的 UTF-16 长度前缀有官方 bug,需自适应对齐)

本模块为独立实现(格式规范源自 BS-Open-Replay,BSD/MIT 兼容),
只提取后端反推谱面所需的 hash 字段。
"""
from __future__ import annotations

import struct

MAGIC_V1 = 0x442D3D69
MAX_STRING = 4096
MAX_FORWARD_SCAN = 512

_HEX40 = set("0123456789abcdefABCDEF")


class BsorError(Exception):
    pass


def _is_hash40(value: str) -> bool:
    return len(value) == 40 and all(c in _HEX40 for c in value)


def _read_str(data: bytes, off: int) -> tuple[str, int]:
    if off + 4 > len(data):
        raise BsorError("unexpected end (string length)")
    (n,) = struct.unpack_from("<i", data, off)
    off += 4
    if n < 0 or n > MAX_STRING or off + n > len(data):
        raise BsorError(f"invalid string length {n}")
    s = data[off : off + n].decode("utf-8", errors="replace")
    return s, off + n


def _read_str_adaptive(data: bytes, off: int) -> tuple[str, int]:
    """读字符串并修复 playerName 的 UTF-16 长度前缀 bug(官方 DecodeName 语义)。

    按声明长度读完后,若下一个字段不是合法字符串长度前缀,
    则前向扫描(≤512B)找到对齐点。
    """
    s, off = _read_str(data, off)
    nxt = struct.unpack_from("<i", data, off)[0] if off + 4 <= len(data) else -1
    if 0 <= nxt <= MAX_STRING:
        return s, off
    for extra in range(1, MAX_FORWARD_SCAN):
        q = off + extra
        if q + 4 > len(data):
            break
        lp = struct.unpack_from("<i", data, q)[0]
        if 0 <= lp <= MAX_STRING and q + 4 + lp <= len(data):
            return s, q
    raise BsorError("playerName boundary could not be aligned")


def _try_standard_layout(data: bytes) -> str | None:
    """布局 A:ScoreSaber 标准 BSOR。"""
    off = 6
    try:
        off += 4  # i32 version
        for _ in range(5):
            _s, off = _read_str(data, off)
        off += 4  # songLength f32
        song_hash, _off = _read_str(data, off)
        if _is_hash40(song_hash):
            return song_hash.upper()
    except BsorError:
        return None
    return None


def _try_beatleader_layout(data: bytes) -> str | None:
    """布局 B:BeatLeader 0.9.33+。"""
    off = 6
    try:
        mod_version, off = _read_str(data, off)
        if not mod_version or len(mod_version) > 32:
            return None  # 不像版本字符串
        _s, off = _read_str(data, off)   # gameVersion
        _s, off = _read_str(data, off)   # timestamp
        _s, off = _read_str(data, off)   # playerId
        _s, off = _read_str_adaptive(data, off)  # playerName(bug 修复)
        _s, off = _read_str(data, off)   # platform
        _s, off = _read_str(data, off)   # trackingSystem
        _s, off = _read_str(data, off)   # hmd
        _s, off = _read_str(data, off)   # controller
        map_hash, _off = _read_str(data, off)
        if _is_hash40(map_hash):
            return map_hash.upper()
    except BsorError:
        return None
    return None


def extract_song_hash(data: bytes) -> str | None:
    """从 BSOR 字节流提取谱面 hash(大写 HEX)。先试标准布局,再试 BeatLeader。"""
    if len(data) < 16:
        return None
    magic, _version = struct.unpack_from("<iB", data, 0)
    if magic != MAGIC_V1:
        return None
    if data[5] != 0:  # 非 info 段开头
        return None
    return _try_standard_layout(data) or _try_beatleader_layout(data)


def extract_song_hash_from_file(path: str | bytes) -> str | None:
    """从 .bsor 文件提取 hash(只读前 4KB)。"""
    try:
        with open(path, "rb") as f:
            head = f.read(4096)
    except OSError:
        return None
    return extract_song_hash(head)
