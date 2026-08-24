"""Local-ChroViewer Python 后端(FastAPI)。

能力:
1. 静态服务 chroviewer 前端产物(预压缩 .gz/.br + SPA fallback + 缓存头)
2. GET /api/source?url=…   官方语义代理(https/重定向/256MB/SSRF)
3. GET /health
4. 本地四机制:
   POST /api/local/open            注册 .bsor,提取 songHash,倒推 CustomLevels
   GET  /replay/{id}/raw           BSOR 字节流(原样透传,前端解析)
   GET  /api/maps/{hash}/package   本地谱面 zip;未命中 → BeatSaver 下载并缓存到项目缓存区
   GET  /api/local/stats           索引状态

路径约定(BSManager 实例):
  bsor:    <instance>/UserData/BeatLeader/Replays/*.bsor
  maps:    <instance>/Beat Saber_Data/CustomLevels/
  cache:   <instance>/UserData/SongCore/SongHashData.dat(游戏自产 hash 缓存)
"""
from __future__ import annotations

import io
import json
import mimetypes
import os
import pathlib
import socket
import sys
import time
import urllib.parse
import zipfile
from typing import Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse, Response

from .bsor_info import extract_song_hash_from_file
from .map_index import MapIndex
from .session import session_files
from .source_proxy import proxy_remote_source

PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent

if getattr(sys, "frozen", False):
    # PyInstaller 打包:exe 同目录为应用根(frontend/ + data/)
    APP_ROOT = pathlib.Path(sys.executable).resolve().parent
else:
    APP_ROOT = PROJECT_ROOT

if getattr(sys, "frozen", False):
    # PyInstaller 打包:前端产物在 exe 同目录 frontend/
    DIST_DIR = APP_ROOT / "frontend"
else:
    DIST_DIR = pathlib.Path(
        os.environ.get(
            "LOCAL_CHROVIEWER_DIST",
            str(PROJECT_ROOT / "web" / ".output" / "public"),
        )
    )
DATA_DIR = APP_ROOT / "data"
MAP_CACHE_DIR = DATA_DIR / "map-cache"
INDEX_CACHE_FILE = DATA_DIR / "map-index.json"

app = FastAPI(title="Local-ChroViewer", docs_url=None, redoc_url=None)

index = MapIndex(INDEX_CACHE_FILE)

# 长缓存目录(官方 routeRules 语义)
_IMMUTABLE_PREFIXES = ("/assets/", "/fonts/", "/twemoji/", "/environments/textures/")
_CACHEABLE_PREFIXES = ("/environments/",)


# ---------- 路径倒推 ----------
def find_instance_root(bsor_path: pathlib.Path) -> Optional[pathlib.Path]:
    """从 .bsor 路径逐级上溯,找含 'Beat Saber_Data' 目录的实例根。"""
    cur = bsor_path.parent
    while True:
        if (cur / "Beat Saber_Data").is_dir():
            return cur
        parent = cur.parent
        if parent == cur:
            return None
        cur = parent


def locate_custom_levels(bsor_path: pathlib.Path) -> Optional[pathlib.Path]:
    root = find_instance_root(bsor_path)
    if root is None:
        return None
    return root / "Beat Saber_Data" / "CustomLevels"


def locate_songcore_cache(bsor_path: pathlib.Path) -> Optional[pathlib.Path]:
    root = find_instance_root(bsor_path)
    if root is None:
        return None
    p = root / "UserData" / "SongCore" / "SongHashData.dat"
    return p if p.exists() else None


# ---------- 基础端点 ----------
@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/source")
async def api_source(url: Optional[str] = None):
    body, status, headers, error = await proxy_remote_source(url)
    if error is not None:
        return Response(error, status_code=status, media_type="text/plain; charset=utf-8",
                        headers={"cache-control": "no-store"})
    return Response(body, status_code=status, headers=headers)


# ---------- 本地能力 ----------
@app.post("/api/local/open")
def api_local_open(body: dict):
    raw_path = body.get("path")
    if not raw_path:
        raise HTTPException(400, "missing path")
    path = pathlib.Path(raw_path).expanduser()
    if not path.is_file():
        raise HTTPException(404, f"file not found: {path}")

    song_hash = extract_song_hash_from_file(path)
    file_id = session_files.register(path)

    levels_dir = locate_custom_levels(path)
    songcore_cache = locate_songcore_cache(path)
    if levels_dir is not None:
        index.set_levels_dir(levels_dir)
        index.set_songcore_cache(songcore_cache)
        index.load()
        if song_hash and index.resolve(song_hash) is None:
            index.scan()  # 懒扫描:未命中时确保索引完整

    map_found = bool(song_hash and index.resolve(song_hash))
    return {
        "id": file_id,
        "songHash": song_hash,
        "mapFound": map_found,
        "fileName": path.name,
        "replayUrl": f"/replay/{file_id}/raw",
        "customLevels": str(levels_dir) if levels_dir else None,
    }


@app.get("/replay/{file_id}/raw")
def replay_raw(file_id: str):
    path = session_files.get(file_id)
    if path is None or not path.exists():
        raise HTTPException(410, "replay file no longer available")
    return FileResponse(path, media_type="application/octet-stream",
                        filename=path.name, headers={"cache-control": "no-store"})


def _zip_map_folder(folder: pathlib.Path) -> bytes:
    """ZIP_STORED 打包谱面文件夹(音频/图片已压缩,.egg 加密,压缩无益)。"""
    files = [f for f in folder.rglob("*") if f.is_file()]
    total = sum(f.stat().st_size for f in files)
    if total > 500 * 1024 * 1024:
        raise HTTPException(413, f"map folder too large ({total // 1048576}MB)")
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_STORED) as zf:
        for f in sorted(files):
            zf.write(f, f.relative_to(folder).as_posix())
    return buf.getvalue()


async def _download_map_to_cache(song_hash: str) -> pathlib.Path:
    """从 BeatSaver 下载谱面 zip 存入项目缓存区(data/map-cache/)。"""
    import httpx
    cache_path = MAP_CACHE_DIR / f"{song_hash.upper()}.zip"
    if cache_path.exists():
        return cache_path
    MAP_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    _set_download_progress(song_hash, "downloading", 0, None)
    try:
        async with httpx.AsyncClient(timeout=180.0, follow_redirects=True) as client:
            meta = await client.get(f"https://api.beatsaver.com/maps/hash/{song_hash.lower()}")
            if meta.status_code != 200:
                raise HTTPException(502, f"BeatSaver lookup failed ({meta.status_code})")
            data = meta.json()
            versions = data.get("versions") or []
            if not versions:
                raise HTTPException(404, "BeatSaver has no versions for this hash")
            download_url = versions[0].get("downloadURL")
            if not download_url:
                raise HTTPException(502, "BeatSaver version missing downloadURL")
            tmp = cache_path.with_suffix(".part")
            try:
                with open(tmp, "wb") as f:
                    async with client.stream("GET", download_url) as resp:
                        if resp.status_code != 200:
                            raise HTTPException(502, f"BeatSaver download failed ({resp.status_code})")
                        total = int(resp.headers.get("content-length") or 0) or None
                        _set_download_progress(song_hash, "downloading", 0, total)
                        received = 0
                        async for chunk in resp.aiter_bytes():
                            f.write(chunk)
                            received += len(chunk)
                            _set_download_progress(song_hash, "downloading", received, total)
                tmp.replace(cache_path)
            except Exception:
                tmp.unlink(missing_ok=True)
                _set_download_progress(song_hash, "error", 0, None)
                raise
    except Exception:
        _set_download_progress(song_hash, "error", 0, None)
        raise
    _set_download_progress(song_hash, "ready", None, None)
    return cache_path


_download_progress: dict[str, dict] = {}  # hash -> {state, received, total, progress, updated_at}
_PROGRESS_TTL = 300.0  # 状态保留 5 分钟


def _set_download_progress(song_hash: str, state: str, received: int | None, total: int | None) -> None:
    progress = None
    if state == "downloading" and received is not None and total:
        progress = min(received / total, 1.0)
    elif state == "ready":
        progress = 1.0
    _download_progress[song_hash] = {
        "state": state,
        "received": received,
        "total": total,
        "progress": progress,
        "updated_at": time.time(),
    }


def _prune_download_progress() -> None:
    cutoff = time.time() - _PROGRESS_TTL
    for h in [h for h, v in _download_progress.items() if v["updated_at"] < cutoff]:
        _download_progress.pop(h, None)


@app.get("/api/maps/{song_hash}/progress")
def api_map_progress(song_hash: str):
    """谱面下载进度(供前端轮询):{state: downloading|ready|error|unknown, progress}"""
    _prune_download_progress()
    info = _download_progress.get(song_hash.strip().upper())
    if info is None:
        return {"state": "unknown", "progress": None}
    return {k: info[k] for k in ("state", "received", "total", "progress")}


@app.get("/api/maps/{song_hash}/package")
async def api_map_package(song_hash: str):
    song_hash = song_hash.strip().upper()
    if len(song_hash) != 40 or not all(c in "0123456789ABCDEF" for c in song_hash):
        raise HTTPException(400, "invalid map hash")

    entry = index.resolve(song_hash)
    if entry is not None:
        folder = pathlib.Path(entry["path"])
        if folder.is_dir():
            return Response(_zip_map_folder(folder), media_type="application/zip",
                            headers={"content-disposition": "attachment; filename=map.zip",
                                     "x-map-source": "local"})
    # 未命中本地 → BeatSaver 下载并缓存到项目缓存区
    cache_path = await _download_map_to_cache(song_hash)
    return FileResponse(cache_path, media_type="application/zip",
                        filename="map.zip",
                        headers={"content-disposition": "attachment; filename=map.zip",
                                 "x-map-source": "cache"})


@app.get("/api/local/stats")
def api_local_stats():
    return {
        "dist": str(DIST_DIR),
        "distReady": (DIST_DIR / "index.html").is_file(),
        "levelsDir": str(index.levels_dir()) if index.levels_dir() else None,
        "indexedMaps": len(index._by_hash) if index._by_hash else 0,
        "mapCacheDir": str(MAP_CACHE_DIR),
    }


# ---------- 静态服务(catch-all 必须在所有 API 路由之后定义) ----------
def _serve_file(request: Request, rel: str) -> Response:
    # 防目录穿越
    target = (DIST_DIR / rel.lstrip("/")).resolve()
    if not str(target).startswith(str(DIST_DIR.resolve())):
        return Response("not found", status_code=404)

    accept_encoding = request.headers.get("accept-encoding", "")
    if target.is_file():
        path, encoding = target, None
        if "br" in accept_encoding and target.with_name(target.name + ".br").is_file():
            path, encoding = target.with_name(target.name + ".br"), "br"
        elif "gzip" in accept_encoding and target.with_name(target.name + ".gz").is_file():
            path, encoding = target.with_name(target.name + ".gz"), "gzip"
        return _file_response(path, encoding, request.url.path)

    # SPA fallback
    index_file = DIST_DIR / "index.html"
    if not index_file.is_file():
        return Response("frontend not built", status_code=500)
    if "br" in accept_encoding and (DIST_DIR / "index.html.br").is_file():
        return _file_response(DIST_DIR / "index.html.br", "br", "/")
    if "gzip" in accept_encoding and (DIST_DIR / "index.html.gz").is_file():
        return _file_response(DIST_DIR / "index.html.gz", "gzip", "/")
    return _file_response(index_file, None, "/")


def _file_response(path: pathlib.Path, encoding: Optional[str], url_path: str) -> Response:
    media = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    headers = {"x-content-type-options": "nosniff"}
    if encoding:
        headers["content-encoding"] = encoding
    if url_path.startswith(_IMMUTABLE_PREFIXES):
        headers["cache-control"] = "public, max-age=31536000, immutable"
    elif url_path.startswith(_CACHEABLE_PREFIXES):
        headers["cache-control"] = "public, max-age=3600, must-revalidate"
    else:
        headers["cache-control"] = "no-cache"
    return FileResponse(path, media_type=media, headers=headers)


@app.get("/{path:path}", include_in_schema=False)
def static_or_spa(path: str, request: Request):
    if path.startswith("api/") or path.startswith("replay/"):
        raise HTTPException(404, "not found")
    return _serve_file(request, path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8787, log_level="info")

