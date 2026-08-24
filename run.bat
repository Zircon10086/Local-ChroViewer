@echo off
rem Local-ChroViewer - webview 内建窗口模式
cd /d "%~dp0"
where python >nul 2>nul || (echo [ERROR] python not found in PATH & pause & exit /b 1)
python -m server.launcher %*
