"""webview 版入口(PyInstaller 打包用):内建窗口模式。"""
import sys

from server.launcher import main

if __name__ == "__main__":
    sys.exit(main())
