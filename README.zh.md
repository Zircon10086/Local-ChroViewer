# Local-ChroViewer

Beat Saber 谱面/回放本地查看器 —— [ChroViewer](https://github.com/Umbranoxio/chroviewer) 的本地移植版,以原生 webview 窗口(pywebview / WebView2)+ Python(FastAPI)后端独立运行。

**本地优先,云端兜底**:选择本地 `.bsor` 回放 → 自动在本地游戏目录
(`Beat Saber_Data\CustomLevels`)匹配谱面 → 全程无网络;只有本地没有(或版本过期)
才从 BeatSaver 下载,存入项目自己的缓存区,下载期间显示实时进度环。

## 功能

- 本地 .bsor 回放(BeatLeader / ScoreSaber 格式),自动匹配本地谱面
  (SongCore hash,优先 `SongHashData.dat` 缓存 + `CustomLevels` 扫描)
- 在线源:BeatSaver / ScoreSaber / BeatLeader(搜索、排行榜、回放)——CORS
  允许的直连,不允许的走本地代理
- 官方 ChroViewer 完整渲染引擎(环境、灯光、Bloom、镜面反射、雾效、HUD、时间轴)
- 谱面缓存:本地命中 → 本地 zip;未命中 → BeatSaver 下载到 `data/map-cache/`,
  界面显示下载进度
- 端口 4680 起,被占用自动顺延(4681..4699)
- 双击 .bsor 直接打开(`Local-ChroViewer.exe "x.bsor"`)

## 目录结构

```
├── web/                 官方 ChroViewer fork(前端,GPL-2.0)
├── server/              Python 后端(FastAPI:静态服务、代理、本地回放/谱面通道)
├── launcher/            打包入口(pywebview 窗口)
├── scripts/             build.py(PyInstaller → GitHub_Build/v<version>/)、验证工具
├── saberlab/chro/       SaberLab 插件分发物(GPL-2.0,见下)
├── docs/                分析与设计报告(英文)
└── GitHub_Build/        打包输出(已 gitignore)
```

## 运行方式(开发环境)

需要 Python 3.12+;Node 24.15+ / pnpm 11.20+ 仅前端构建需要。

```bat
run.bat                         rem 启动本地 webview 窗口
```

或直接:

```bat
python -m server.launcher                rem 本地窗口
python -m server.launcher "xxx.bsor"     rem 直接打开回放
```

## 打包

```bat
python -m pip install -r server\requirements-dev.txt
python scripts\build.py                  rem 输出到 GitHub_Build\v1.0.0\
```

产物(`GitHub_Build\v<version>\`,windowed,双击不弹命令行):

- `Local-ChroViewer-v<version>\` — 运行目录:`Local-ChroViewer.exe`(webview 本地窗口)+ 共享 `frontend/` + 运行时
- `Local-ChroViewer-v<version>.zip` — Release 发布用压缩包

## 前端构建(web/ 内)

```bat
cd web
pnpm install --frozen-lockfile
pnpm exec vp build        rem 产出 .output/public(静态化预渲染)
```

相对上游(commit `dd01022`)的本地化改动:

- `src/sources/local/provider.ts`(新增):本地源适配器
- `src/modules/viewer/use-viewer-remote-source.ts`:`resolveLocalFirst`(本地优先)+ 下载进度接通
- `vite.config.ts`:TanStack Start 原生 prerender(`/`)

## SaberLab 插件(saberlab/chro)

`saberlab/chro` 是本项目为 [SaberLab](https://github.com/ZiRCON/SaberLab)(Beat Saber
回放分析工具,GPL-3.0-or-later)构建的**独立插件分发物**。

把它从 SaberLab 仓库移出的原因是**许可证兼容性**:ChroViewer 是 `GPL-2.0-only`,
与 SaberLab 的 `GPL-3.0-or-later` 不兼容。将 ChroViewer 衍生代码放在本仓库独立维护,
统一标注 **GPL-2.0-only**,既避免协议冲突,SaberLab 也能以插件形式正常使用。

- 相对上游的完整修改清单见
  [`saberlab/chro/MODIFICATIONS.en.md`](saberlab/chro/MODIFICATIONS.en.md)
  (本地 map 源、纯客户端挂载、移除远程入口等)
- 该目录是静态构建产物(前端 dist);SaberLab 挂载在 `/chro/` 下,
  以 iframe 方式嵌入(`/chro/?replayUrl=<origin>/api/replays/{id}/raw`)

## 许可证

- 本项目:**GPL-2.0-only**(见 LICENSE)
- 前端 fork 自 [ChroViewer](https://github.com/Umbranoxio/chroviewer)(GPL-2.0),
  渲染引擎衍生自 [ChroMapper](https://github.com/Caeden117/ChroMapper)(GPL-2.0,
  署名见 `web/ATTRIBUTIONS.md`)
- `saberlab/chro` 插件:**GPL-2.0-only**(与项目其余部分一致,见
  `saberlab/chro/LICENSE` 与 `MODIFICATIONS.en.md`)
- 后端格式参考 [BS-Open-Replay](https://github.com/BeatLeader/BS-Open-Replay)(MIT)
  与 [SongCore](https://github.com/Kylemc1413/SongCore)(MIT)
