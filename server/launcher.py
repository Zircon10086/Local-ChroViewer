"""Local-ChroViewer 启动器(webview 本地窗口,唯一运行方式)。

- 端口:4680 起,被占用自动顺延(最多 19 个)
- 窗口:pywebview / WebView2 内建窗口,关闭窗口即退出
- 双击 .bsor:python -m server.launcher "xxx.bsor" → 自动注册并导航回放

用法:
    python -m server.launcher                # 启动本地窗口
    python -m server.launcher --port 4680    # 指定起始端口
    python -m server.launcher "xxx.bsor"     # 直接打开回放
"""
from __future__ import annotations

import argparse
import json
import pathlib
import socket
import sys
import threading
import time
import urllib.request
import urllib.parse

if getattr(sys, "frozen", False) and (sys.stdout is None or sys.stderr is None):
    # PyInstaller windowed(console=False)下 stdout/stderr 为 None,
    # uvicorn 日志配置访问 .isatty() 会崩溃 → 重定向到日志文件。
    _log_dir = pathlib.Path(sys.executable).resolve().parent / "data" / "logs"
    _log_dir.mkdir(parents=True, exist_ok=True)
    _log_file = open(_log_dir / "launcher.log", "a", encoding="utf-8")
    if sys.stdout is None:
        sys.stdout = _log_file  # type: ignore[assignment]
    if sys.stderr is None:
        sys.stderr = _log_file  # type: ignore[assignment]

import uvicorn  # noqa: E402

from .main import app  # noqa: E402

DEFAULT_PORT = 4680
PORT_RANGE = 20


def find_free_port(start: int = DEFAULT_PORT) -> int:
    for port in range(start, start + PORT_RANGE):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError(f"ports {start}..{start + PORT_RANGE - 1} are all occupied")


class ServerThread:
    """uvicorn 服务线程 + 就绪等待。"""

    def __init__(self, port: int):
        self.port = port
        self.url = f"http://127.0.0.1:{port}"
        self._server: uvicorn.Server | None = None
        self._thread: threading.Thread | None = None

    def start(self) -> bool:
        # log_config=None:完全禁用 uvicorn 日志配置(windowed 下无 tty,
        # 且日志已由 launcher 重定向;访问日志默认在 warning 级别本就不可见)
        config = uvicorn.Config(app=app, host="127.0.0.1", port=self.port,
                                log_level="warning", log_config=None)
        self._server = uvicorn.Server(config)
        self._thread = threading.Thread(target=self._server.run, daemon=True)
        self._thread.start()
        for _ in range(150):  # 最多 15s
            try:
                urllib.request.urlopen(self.url + "/health", timeout=0.5).read()
                return True
            except OSError:
                time.sleep(0.1)
        return False

    def stop(self) -> None:
        if self._server is not None:
            self._server.should_exit = True


def open_local_replay(base_url: str, bsor_path: str) -> str | None:
    """注册本地 .bsor 并返回前端导航 URL(?replayUrl=…),失败返回 None。"""
    body = json.dumps({"path": str(bsor_path)}).encode("utf-8")
    req = urllib.request.Request(
        base_url + "/api/local/open",
        data=body,
        headers={"content-type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except OSError:
        return None
    replay_url = base_url + data.get("replayUrl", "")
    return base_url + "/?replayUrl=" + urllib.parse.quote(replay_url, safe="")


def run_webview(server: ServerThread, argv_bsor: str | None) -> int:
    """pywebview 内建本地窗口(唯一运行方式)。"""
    try:
        import webview
    except ImportError as e:
        print(f"[launcher] pywebview unavailable: {e}", flush=True)
        return 1

    class Api:
        """js_api:前端可调 window.pywebview.api.pick_bsor() 弹系统文件对话框。"""

        def __init__(self) -> None:
            self._window = None

        def bind(self, window) -> None:
            self._window = window

        def pick_bsor(self) -> str | None:
            if self._window is None:
                return None
            result = self._window.create_file_dialog(
                webview.OPEN_DIALOG, file_types=("Beat Saber replay (*.bsor)", "*.bsor")
            )
            if not result:
                return None
            path = result[0] if isinstance(result, (list, tuple)) else result
            return open_local_replay(server.url, path) or None

    api = Api()
    window = webview.create_window(
        "Local-ChroViewer",
        server.url,
        js_api=api,
        width=1280,
        height=800,
        min_size=(960, 600),
        background_color="#000000",
    )
    api.bind(window)

    # 双击 .bsor(argv[1]) → 注册后导航(等窗口 loaded 再导航)
    if argv_bsor:
        nav = open_local_replay(server.url, argv_bsor)
        if nav is not None:
            try:
                window.events.loaded += lambda: window.load_url(nav)
            except AttributeError:
                window.load_url(nav)

    webview.start()
    print("[launcher] window closed, shutting down server", flush=True)
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Local-ChroViewer launcher")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="起始端口(默认 4680)")
    parser.add_argument("bsor", nargs="?", default=None, help="可选:直接打开的 .bsor 文件路径")
    args = parser.parse_args()

    port = find_free_port(args.port)
    server = ServerThread(port)
    if not server.start():
        print("[launcher] server failed to start", flush=True)
        return 1
    print(f"[launcher] serving at {server.url}", flush=True)

    try:
        return run_webview(server, args.bsor)
    finally:
        server.stop()


if __name__ == "__main__":
    raise SystemExit(main())
