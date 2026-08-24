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


def shot(tag: str):
    global shot_count
    shot_count += 1
    path = OUT_DIR / f"wv-{shot_count:02d}-{tag}.png"
    ImageGrab.grab().save(path)
    print(f"[test] screenshot {path.name}", flush=True)


def send_esc():
    user32 = ctypes.windll.user32
    user32.keybd_event(0x1B, 0, 0, 0)
    user32.keybd_event(0x1B, 0, 2, 0)


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
                shot("replay")
                window.destroy()
                return

            time.sleep(4)
            shot("launcher")

            # 1. 触发 input[type=file] 弹系统文件对话框
            ok = window.evaluate_js(
                "(() => { const el = document.querySelector('input[type=file]');"
                " if (!el) return 'no-input'; el.click(); return 'clicked'; })()"
            )
            print(f"[test] input[type=file].click() => {ok}", flush=True)
            time.sleep(3)
            shot("file-dialog")
            send_esc()
            time.sleep(2)

            # 2. 导航 replayUrl(本地回放链路)
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
