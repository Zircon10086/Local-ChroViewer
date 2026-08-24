# Local-ChroViewer

Beat Saber 谱面/回放本地查看器 —— [ChroViewer](https://github.com/Umbranoxio/chroviewer) 的本地移植版。

**本地优先,云端兜底**:选择本地 `.bsor` 回放 → 自动在本地游戏目录
(`Beat Saber_Data\CustomLevels`)匹配谱面 → 全程无网络;本地没有(或版本过期)
才从 BeatSaver 下载并缓存到项目自己的缓存区。

## 运行方式(开发环境)

需要:Python 3.12+、Node 24.15+ / pnpm 11.20+(仅前端构建需要)

```bat
run.bat                         rem 启动本地 webview 窗口(4680 端口,占用自动顺延)
```

或直接:

```bat
python -m server.launcher                rem 本地窗口
python -m server.launcher "xxx.bsor"     rem 双击打开回放
```

## 功能

- 本地 .bsor 回放(BeatLeader / ScoreSaber 格式,自动匹配本地谱面)
- 在线源:BeatSaver / ScoreSaber / BeatLeader(搜索、排行榜、回放)
- 官方 ChroViewer 完整渲染引擎(环境、灯光、Bloom、镜面反射、HUD、时间轴)
- 谱面缓存:本地命中 → 本地 zip;未命中 → BeatSaver 下载 → `data/map-cache/`
- 端口 4680 起,被占用自动顺延(4681..4699)

## 目录结构

```
├── web/                 官方 ChroViewer fork(前端,含构建产物 .output/)
├── server/              Python 后端(FastAPI:静态服务 + 代理 + 本地谱面/回放通道)
│   ├── main.py          路由与静态服务
│   ├── launcher.py      启动器(端口探测 / webview 本地窗口)
│   ├── bsor_info.py     BSOR 轻量提取(双格式:标准 BSOR / BeatLeader)
│   ├── map_index.py     CustomLevels 索引(SongCore hash + SongHashData.dat)
│   └── source_proxy.py  /api/source 代理(官方语义)
├── launcher/            打包入口(entry_webview)
├── scripts/
│   ├── build.py         打包脚本(→ GitHub_Build/v<version>/)
│   └── tools/           测试工具(cdp_shot / webview_test)
├── docs/                设计与分析文档
└── GitHub_Build/        打包输出(已 gitignore)
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
pnpm exec vp build        rem 产出 .output/public(静态化,Phase 1 已验证)
```

前端已做本地化改动(相对官方 commit `dd01022`):

- `src/sources/local/provider.ts`(新增):本地源适配器
- `src/modules/viewer/use-viewer-remote-source.ts`:`resolveLocalFirst` 本地优先
- `vite.config.ts`:TanStack Start 原生 prerender(`/`)

## 许可证

- 本项目:**GPL-2.0-only**(见 LICENSE)
- 前端 fork 自 [ChroViewer](https://github.com/Umbranoxio/chroviewer)(GPL-2.0),
  渲染引擎衍生自 [ChroMapper](https://github.com/Caeden117/ChroMapper)(GPL-2.0,
  署名见 `web/ATTRIBUTIONS.md`)
- 后端部分代码格式参考 [BS-Open-Replay](https://github.com/BeatLeader/BS-Open-Replay)(MIT)
  与 [SongCore](https://github.com/Kylemc1413/SongCore)(MIT),均已保留格式口径说明
