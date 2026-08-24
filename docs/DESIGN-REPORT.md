# Local-ChroViewer 本地版设计报告(基于 SaberLab 实践验证)

> 日期:2026-08-24
> 输入:① SaberLab 项目代码逐项核实 ② 官方 ChroViewer 代码(Phase 1 已验证)
> 目标:exe 双击启动(无控制台窗口)→ 自动弹出本地 webview 窗口;本地 .bsor 直读、按 hash 反推本地谱面、绕过网络

---

## 一、SaberLab 实践可信度验证(全部通过)

参考的 SaberLab 资产逐项实际读取核实,结论:**内容与真实代码完全一致,可直接作为实施蓝本**:

| 引用资产 | 验证结果 |
|---|---|
| `backend/bsor/parser.py` + `models.py` | ✅ 存在。BSOR v1 二进制解析器,严格对齐官方 C# ReplayDecoder(魔数 0x442D3D69、7 种节类型、playerName UTF-16 长度前缀官方 bug 修复) |
| `backend/maps/resolver.py` | ✅ 存在。`compute_level_hash()` = SongCore 算法;**SHA1(info.dat 字节 + 按 `_difficultyBeatmapSets` 顺序的各难度 .dat 字节) → 大写 HEX**;`load_songcore_cache()` 读游戏自产 `UserData/SongCore/SongHashData.dat` |
| `backend/main.py` 两个端点 | ✅ 存在且契约一致:`/api/replays/{id}/raw`(FileResponse 原样透传字节)+ `/api/maps/{hash}/package`(**ZIP_STORED 不压缩** + 一次性 `Response(bytes)` + 500MB 上限 413) |
| `backend/host.py` | ✅ 存在。端口探测、uvicorn 线程 + 就绪轮询、窗口失败回退、重启子进程、PyInstaller 用 `app` 对象而非 import string |
| `packaging/saberlab.spec` | ✅ 存在。PyInstaller onedir;`console=False`(windowed,不弹命令行);`Tree()` 打包前端目录 |

---

## 二、从 SaberLab 提取的关键技术信息

### 2.1 谱面反推链路(核心)

```
BSOR info.songHash → 本地谱面库匹配 → 谱面包(zip)→ 前端既有解包/解析管线
```

- **hash 口径(最重要)**:BeatLeader replay 的 `songHash` 就是 SongCore 谱面 hash(SHA1(info.dat + 按难度集顺序的各难度文件字节))。SaberLab `compute_level_hash()` 是现成实现,源自 SongCore(MIT)
- **三层匹配策略**:① `SongHashData.dat` 缓存(游戏生成,秒解)② 全量扫描 CustomLevels 逐文件夹算 hash(mtime 跳过未变项)③ 未命中 → 前端回退网络或手动选择
- **防坑经验**:全量扫描加锁、负缓存、mtime 复用

### 2.2 BSOR 数据链路

- 后端**只透传字节**,解析全在前端(官方 `?replayUrl=` 契约,前端已有 LZMA 解压 / BeatLeader 格式处理)
- `replayUrl` 必须整体 `encodeURIComponent`(URL 内含 `?`/`&`)
- 会话级文件表(id → 磁盘路径)承接"双击打开"

### 2.3 三个实证坑(务必照抄)

1. **ZIP_STORED**:谱面含已压缩音频/图片 + 加密 `.egg`,DEFLATE 慢且无收益
2. **一次性 Response 而非 StreamingResponse**:同步 BytesIO 按 `\n` 迭代,14MB zip 拆成十几万 chunk
3. **windowed 打包 stdio**:`console=False` 下 stdout/stderr 为 None,必须重定向(否则 uvicorn 日志配置崩溃)

### 2.4 启动器模式(host.py)

端口探测(4680 起 +19)→ uvicorn 线程 → 就绪轮询 → 本地窗口 → 退出清理;PyInstaller 下 uvicorn 必须传 `app` 对象(import string 在 frozen 环境不可见)

---

## 三、技术选型(最终)

| 决策点 | 选型 | 理由 |
|---|---|---|
| 后端框架 | **FastAPI + uvicorn**(与 SaberLab 一致) | FileResponse/Response 现成、生态成熟 |
| BSOR 处理 | **后端只提取 songHash(轻量读取),完整解析留前端** | 前端已具备完整解析;后端只需 hash 做反推 |
| 谱面库索引 | **JSON 文件缓存 + SongHashData.dat 优先** | 只需 hash→路径映射,mtime 判断,无迁移成本 |
| 窗口 | **pywebview(WebView2)本地窗口,唯一运行方式** | 原生窗口外观、系统级文件对话框、WebGL2 已实测可用 |
| 双击 .bsor | exe 接收 `argv[1]` → `POST /api/local/open` → 窗口自动导航 | 已验证 |
| 打包 | **PyInstaller onedir + `console=False`** | windowed = 无命令行窗口;输出单 exe + Release zip |
| 单实例/端口 | 端口探测(4680+19 顺延) | 已验证 |
| 前端本地源 | **`resolveLocalFirst` 一处实现 + 本地 provider** | 改动面最小 |

---

## 四、目标架构(与实施产物一致)

```
Local-ChroViewer.exe  (PyInstaller windowed, console=False)
│
├─ launcher.py  ── 端口探测(4680 起,占用顺延) → uvicorn 线程 → 就绪轮询
│                  → pywebview(WebView2)本地窗口(1280x800)
│                  → argv[1]=.bsor 时 POST /api/local/open → 窗口导航回放
│                  → 关窗 → 停服退出
│
├─ server.py (FastAPI)
│   ├─ GET /*                   静态资源(SPA fallback → index.html)
│   ├─ GET /api/source?url=…    官方语义代理(https/≤5跳转/256MB/私网拦截)
│   ├─ GET /bl/*                [可选] BeatLeader JSON 反代(白名单绕过)
│   ├─ GET /health
│   ├─ ── 本地能力 ──
│   ├─ POST /api/local/open     {path} → {id}   (双击 .bsor)
│   ├─ GET  /replay/{id}/raw    BSOR 字节流(FileResponse 原样透传)
│   ├─ GET  /api/maps/{hash}/package   本地谱面 zip;未命中 → BeatSaver 下载缓存
│   └─ GET  /api/local/stats
│
├─ maps/ (resolver 移植, MIT 保留声明)
│   ├─ compute_level_hash()    SongCore 算法
│   ├─ SongHashData.dat 解析   优先
│   └─ CustomLevels 扫描 + JSON 缓存 + mtime 复用 + 扫描锁
│
└─ frontend/  (web/.output/public, Phase 1 静态化产物)
```

**数据流(用户双击 MyScore.bsor)**:
```
Windows 双击 → Local-ChroViewer.exe MyScore.bsor
  → launcher 起服务器 → POST /api/local/open {path} → {id}
  → 服务器读 .bsor 前几百字节 → 提取 songHash
  → resolver: SongHashData.dat → CustomLevels 扫描 → 命中 folder
  → 窗口导航 ?replayUrl=<enc>/replay/{id}/raw
  → 前端 fetch /replay/{id}/raw 解析 BSOR → replayMapHash → 本地源 /api/maps/{hash}/package
  → fflate 解包 → Web Worker 解析 → Three.js 3D 回放(全程零网络)
```

---

## 五、前端改动点(官方 fork 内,最小面)

| 文件 | 改动 |
|---|---|
| `src/sources/local/provider.ts`(新增) | 本地源适配器:请求 `/api/maps/{hash}/package` → 返回 `{key, hash, files}`(后端自动兜底:本地命中→本地 zip;未命中→BeatSaver 下载缓存) |
| `src/modules/viewer/use-viewer-remote-source.ts` | `resolveLocalFirst`(本地优先,失败回退 BeatSaver 直连);替换全部 5 处找谱面调用(拖入 .bsor / 文件选择 / 分享链接 / SS/BL 在线回放 / 在线搜索) |

> 关键洞察:官方代码**已经**支持"拖入 .bsor 无谱面文件 → 按 hash 自动找谱面"的路径,只是它找的是 BeatSaver。本地版只需把"找谱面"这一步的解析器从网络换成"本地优先"。**前端改动 = 2 个文件。**

---

## 六、实施记录(全部实测)

### P1 静态化(✅)
TanStack Start 原生 prerender(`prerender: { enabled: true, filter }`)→ `.output/public/index.html` 7.3KB + 静态资源;Python 静态服务器 + SPA fallback + gzip 预压缩验证通过。

### P2 服务器(✅)
`server/`(FastAPI):静态服务、`/api/source`、`/health`、`/api/local/open`、`/replay/{id}/raw`、`/api/maps/{hash}/package`、`/api/local/stats`。
真实环境实测(1031 张本地谱面):路径倒推正确;SongHashData.dat + 计算双通道索引秒建;本地命中 10.7MB zip / 4.4s;未命中 → BeatSaver 下载 8.6MB → `data/map-cache/` 缓存 → 二次 3.6s;replay 字节级一致。

**BSOR 双格式发现**:BeatLeader 0.9.33 的 info 段与标准 BSOR 不同——开头是 `modVersion` 字符串而非 i32,第 10 个字符串才是 mapHash(且 `playerName` 有 UTF-16 长度前缀官方 bug)。`bsor_info.py` 已双格式兼容。

**hash 口径验证**:BeatLeader replay 的 `mapHash` = SongCore 谱面 hash(与 BeatSaver 一致)。旧 replay 与本地当前谱面不一致 = 谱面版本更新,属正常现象,兜底链路覆盖。

### P3 本地窗口(✅)
`server/launcher.py`:端口 4680+19 顺延、uvicorn 线程、pywebview(WebView2)窗口、`js_api.pick_bsor()` 系统文件对话框兜底、双击 .bsor argv 导航、关窗停服。
自动化验证(`scripts/tools/webview_test.py`):窗口渲染启动界面 ✅;**`<input type=file>` 弹 Windows 原生文件对话框(过滤 *.dat;*.bsor;*.json)✅**;导航 replayUrl → 地图预览完整渲染(歌曲卡/HUD/时间轴)✅。

### P4 本地优先(✅)
`fetchLocalMap` + `resolveLocalFirst` 落地,端到端验证:本地 .bsor → `/replay/{id}/raw` → 解析 BSOR → 本地命中 zip → 3D 地图预览渲染,全程零网络。

### P5 打包(✅)
`scripts/build.py`:PyInstaller 单 exe(windowed,ChroViewer 官方 logo 图标)→ `GitHub_Build/v<version>/Local-ChroViewer-v<version>/` + **Release zip**;自动清理 .work;文件占用重试。frozen 下 `frontend/` 与 `data/` 以 exe 同级为应用根。

### 下载进度反馈(✅ 2026-08-25)

**问题**:本地未命中、后端从 BeatSaver 下载期间(30s+),前端无任何反馈,看起来"卡住"。

**方案**:官方 `ViewerOverlay` 本就带环形进度条(`progress` 参数),但拖入/选择 .bsor 的 file source 路径未接通下载状态。修复:
- **后端** `server/main.py`:下载进度表 + `GET /api/maps/{hash}/progress`(state/received/total/progress,5 分钟 TTL);下载过程流式统计
- **前端** `src/sources/local/provider.ts`:`fetchLocalMap` 下载期间轮询 progress 端点(500ms),通过 `onProgress` 上报
- **前端** `use-viewer-remote-source.ts` / `use-viewer-file-source.ts`:`resolveLocalFirst` 支持 `requestId` → 接通官方 `sourceDownload` 状态;拖入 .bsor 路径现在显示官方 "Downloading map" overlay + 实时进度环

**实测**(测试素材:本地无此 map 的 bsor,15.4MB 下载):
- 下载中:page state = `"Downloading map"` + overlays:1;截图显示进度环 ~66% 实时填充
- 后端进度:0 → 2.3% → 19% → 63% → 100%(14s)
- 下载完成缓存后再次打开:秒进预览(`WACCA ULTRA DREAM MEGAMIX / USAO & Kobaryo`,见 `docs/verification/cached-preview.png`)

---

## 七、分阶段实施计划(最终形态)

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 | 环境就绪(Node/pnpm/Python/WebView2) | ✅ |
| P1 | 静态化前端(`tanstackStart` 原生 prerender) | ✅ |
| P2 | Python 服务器 4 能力 + 本地谱面/回放通道 | ✅ |
| P3 | pywebview 本地窗口 + 端口顺延 + 双击 .bsor | ✅ |
| P4 | 前端本地源(`resolveLocalFirst` 本地优先) | ✅ |
| P5 | PyInstaller 打包 + Release zip | ✅ |
| P6 | 品牌本地化(标题/logo)、社交卡片裁剪、`/bl` 反代、推 GitHub | 待做 |

---

## 八、许可证(红线)

- 前端 fork:`GPL-2.0-only`,保留 LICENSE + ATTRIBUTIONS.md(法律义务)
- `server/` + `launcher/`:全新 Python 代码,GPL-2.0(与前端同仓库同许可)
- 复用 MIT 上游(BS-Open-Replay / SongCore)代码:保留上游声明,与 GPL-2.0 兼容 ✓
- 分发:Release zip 内含 LICENSE / README / VERSION.txt

---

## 九、风险与对策

| 风险 | 等级 | 对策 |
|---|---|---|
| BSOR songHash 与本地 hash 口径不一致 | 低 | 两端统一归一化(大写 HEX);未命中回退网络 |
| CustomLevels 首扫慢 | 中 | SongHashData.dat 优先 + mtime 跳过 + 后台扫描 |
| `.egg` 加密音频 | 低 | 随包透传,ChroViewer 有降级 |
| pywebview WebGL2 性能 | 低 | 已实测渲染正常;真机硬件加速验收 |
| windowed 无控制台错误不可见 | 低 | 日志写 `data/logs/launcher.log`;窗口内错误页 |
| 打包目录被 exe 占用 | 低 | build.py 重试 + 提示 |

---

## 十、结论

SaberLab 的实践路线**经代码核实完全可信**。核心价值:
1. **SongCore hash 算法 + SongHashData.dat 缓存**——"bsor → 本地谱面"反推的关键钥匙
2. **三个传输坑**(ZIP_STORED / 一次性 Response / windowed stdio)——实战经验直接规避
3. **前端改动面极小**:`resolveLocalFirst` 一处实现,官方已有的"bsor→按 hash 找谱"路径即从网络转为本地优先
4. 全部阶段(P1-P5)已落地并实测通过,产物为单 exe + Release zip
