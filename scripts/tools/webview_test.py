"""webview 模式自动化验证:
1. 窗口加载 ChroViewer 启动界面
2. 触发 <input type=file> → 验证系统文件对话框弹出(选 .bsor 的路径是否可用)
3. 关闭对话框,导航 ?replayUrl= → 验证本地回放链路在 WebView2 内完整工作
每步全屏截图到 out_dir。
"""
from __future__ import annotations

import ctypes
import pathlib
import sys
import time

sys.path.insert(0, r"C:\Users\ZiRCON\Desktop\Local-ChroViewer")

from PIL import ImageGrab  # noqa: E402

import webview  # noqa: E402
from server.launcher import ServerThread, open_local_replay  # noqa: E402

BSOR = sys.argv[1]
OUT_DIR = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else pathlib.Path(r"C:\Users\ZiRCON\Desktop\Local-ChroViewer")
PORT = int(sys.argv[3]) if len(sys.argv) > 3 else 4682

shot_count = 0


def bring_window_to_front(title: str):
    """按标题把窗口置前(全屏截图前调用,避免被其他窗口遮挡)。"""
    user32 = ctypes.windll.user32
    hwnd = user32.FindWindowW(None, title)
    if hwnd:
        # Alt 键技巧绕过 Windows 前台锁(SetForegroundWindow 常被拒绝)
        user32.keybd_event(0x12, 0, 0, 0)
        user32.ShowWindow(hwnd, 9)  # SW_RESTORE
        user32.SetForegroundWindow(hwnd)
        user32.keybd_event(0x12, 0, 2, 0)
        time.sleep(0.6)


def shot(tag: str):
    global shot_count
    shot_count += 1
    bring_window_to_front("CV-Test")
    path = OUT_DIR / f"wv-{shot_count:02d}-{tag}.png"
    ImageGrab.grab().save(path)
    print(f"[test] screenshot {path.name}", flush=True)


def send_esc():
    user32 = ctypes.windll.user32
    user32.keybd_event(0x1B, 0, 0, 0)
    user32.keybd_event(0x1B, 0, 2, 0)


def close_file_dialog():
    """用 WM_CLOSE 关闭系统文件对话框(标题"打开"/"Open"),比 ESC 可靠。"""
    user32 = ctypes.windll.user32
    for title in ("打开", "Open"):
        hwnd = user32.FindWindowW(None, title)
        if hwnd:
            user32.PostMessageW(hwnd, 0x0010, 0, 0)  # WM_CLOSE
            time.sleep(0.5)
            return


def main() -> int:
    server = ServerThread(PORT)
    if not server.start():
        print("[test] server failed", flush=True)
        return 1
    print(f"[test] server at {server.url}", flush=True)

    window = webview.create_window("CV-Test", server.url, width=1280, height=800,
                                   background_color="#000000")

    def on_loaded():
        try:
            # 已导航过(replayUrl 在 URL 中)则只截图不重复执行
            try:
                current = window.get_current_url() or ""
            except Exception:  # noqa: BLE001
                current = ""
            if "replayUrl" in current:
                time.sleep(8)
                try:
                    state = window.evaluate_js(
                        "JSON.stringify({href: location.href,"
                        " text: document.body.innerText.slice(0, 300),"
                        " overlays: document.querySelectorAll('[role=status]').length})"
                    )
                    print(f"[test] page state: {state}", flush=True)
                except Exception as e:  # noqa: BLE001
                    print(f"[test] evaluate_js failed: {e}", flush=True)
                shot("replay")
                window.destroy()
                return

            time.sleep(4)
            shot("launcher")

            # 2. 导航 replayUrl(本地回放链路;文件对话框已另行验证)
            nav = open_local_replay(server.url, BSOR)
            print(f"[test] nav: {nav}", flush=True)
            if nav is None:
                print("[test] open_local_replay failed", flush=True)
                window.destroy()
            else:
                window.load_url(nav)
        finally:
            pass

    window.events.loaded += on_loaded
    webview.start()
    print("[test] window closed", flush=True)
    server.stop()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
