# SaberLab → Local-ChroViewer 独立运行版：开发建议书

> 用途：为「本地 ChroViewer 独立运行版」提供架构建议与关键工程细节。
> 素材来源：① SaberLab 完整走过的 ChroViewer 移植/插件化过程（2026-08，含
> 数据链路实现与实证研究）；② `C:\Users\ZiRCON\Desktop\Local-ChroViewer\ANALYSIS-REPORT.md`
> （新工具对官方 ChroViewer commit `dd01022` 的分析，Phase 1 静态化已验证）。
> 本文件与 ANALYSIS-REPORT 互补：它讲官方代码怎么拆，本文件讲本地版怎么接。

---

## 1. 目标与定位

一个**超级精简版**的本地 ChroViewer：类似 SaberLab 但只保留与 3D 回放相关的
机制，用户双击/选择本地 `.bsor` → 自动定位本地谱面 → 本地窗口内 3D 回放，
**全程无网络下载**。核心机制四件套（用户定义）：

1. 自动翻译 BSOR 数据传给 ChroViewer（replay 数据链路）
2. 根据 replay 位置反推到 map 位置（谱面定位）
3. 本地加载，绕过网络下载
4. Python 后端服务器 + 本地窗口拉起 ChroViewer

许可证：前端为官方 ChroViewer fork（**GPL-2.0-only**，保留 LICENSE 与
ATTRIBUTIONS.md 署名）。后端为全新 Python 代码（建议与前端一致的 GPL-2.0
或独立 MIT 声明，**勿混入 GPL-3.0 代码**，详见 §7）。

---

## 2. 推荐总体架构

```
┌────────────────────────────────────────────────────┐
│ launcher.py（启动器）                                │
│   端口分配 → 起 uvicorn → 拉起窗口（Chrome --app）   │
│   退出清理（杀子进程 / 单实例锁）                     │
└───────────────┬────────────────────────────────────┘
                │ http://127.0.0.1:<port>
┌───────────────▼────────────────────────────────────┐
│ server/（Python 后端，FastAPI + uvicorn）            │
│   GET  /*          静态资源（SPA fallback → index.html）│
│   GET  /api/source?url=…   官方语义代理（仅 https / ≤5 跳转 / 256MB / 私网拦截）│
│   GET  /bl/*        [可选] BeatLeader JSON 反代       │
│   GET  /health                                      │
│   ── 本地增强（§3 四机制落点）──                      │
│   GET  /replay/{id}/raw          BSOR 字节流         │
│   GET  /api/maps/{hash}/package  谱面包（zip）        │
│   GET  /api/local/replays        本地 replay 库列表   │
│   POST /api/local/open           （双击/打开文件映射） │
└───────────────┬────────────────────────────────────┘
                │ iframe ?replayUrl=…（浏览器端解析/渲染）
┌───────────────▼────────────────────────────────────┐
│ chroviewer-official/（前端，Phase 1 已静态化）        │
│   渲染/解析/回放/OPFS 缓存全在浏览器端                │
│   src/sources/ 加"本地源"适配器（Phase 4）           │
└────────────────────────────────────────────────────┘
```

架构哲学（官方已证实）：**浏览器做一切，服务器打杂**。Python 只提供
静态外壳 + 少量数据通道，前端零改动即可跑通（Phase 1-3），本地化增强（Phase 4）
也只加一个"本地源"适配器 + 几个后端端点。

---

## 3. 四个核心机制的推荐实现

### 3.1 BSOR 数据传输给 ChroViewer

官方契约：iframe `?replayUrl=<encodeURIComponent(url)>`，ChroViewer 自行
fetch 该 URL 并解析（新版支持 ScoreSaber LZMA 解压 / BeatLeader 格式）。

后端端点（照抄 SaberLab 已验证的契约）：

```python
@app.get("/replay/{rid}/raw")
def replay_raw(rid: str):
    path = ...  # 本地 replay 文件（replay 库目录或用户打开的文件）
    return FileResponse(path, media_type="application/octet-stream",
                        filename="replay.bsor")
```

细节：
- 后端只需把**文件字节**给出去，解析全在前端——后端不做任何 BSOR 分析
- `replayUrl` 必须整体 `encodeURIComponent`（含 `?`/`&`）
- 本地文件 → URL 映射：维护一个"会话级文件表"（id → 磁盘路径），
  `POST /api/local/open` 接收路径返回 `{id}`，前端拼 `?replayUrl=/replay/{id}/raw`

### 3.2 根据 replay 反推本地谱面（绕过网络）

链路：`BSOR info.songHash → 本地 CustomLevels 扫描匹配 → 谱面包接口`。

- **hash 口径**：BeatLeader replay 的 `songHash` = **SongCore 谱面 hash**
  （SHA1(info.dat 字节 + 按 `_difficultyBeatmapSets` 顺序的各难度文件字节)）。
  SaberLab `backend/maps/resolver.py` 的 `compute_level_hash()` 是现成实现
  （源自 SongCore，MIT）。
- **匹配策略**（推荐三层）：
  1. `SongHashData.dat` 缓存（文件夹名 → hash 映射表，游戏生成，同仓库有解析参考）
  2. 全量扫描 `CustomLevels/` 逐文件夹算 hash（首扫慢，可缓存结果到本地 json）
  3. 未命中 → 前端回退到"拖放/浏览选择谱面"（官方路径 A 原生支持）
- 前端落点：`src/sources/` 新增 **"本地源"适配器**（参考 SaberLab 旧移植版
  `Local-ChroViewer/src/sources/saberlab/provider.ts` 的思路）：
  解析出 songHash → 请求后端 `GET /api/maps/{hash}/package` → 得到 zip →
  交给既有解包/解析管线（fflate + Web Worker），与官方路径 A 完全复用。

### 3.3 本地加载 / 谱面包接口

```python
@app.get("/api/maps/{hash}/package")
def map_package(hash: str):
    folder = resolve_local_map(hash)          # §3.2 的匹配结果
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_STORED) as zf:
        for f in sorted(folder.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(folder).as_posix())
    return Response(buf.getvalue(), media_type="application/zip")
```

SaberLab 实战验证过的三个坑（务必照抄）：
- **用 `ZIP_STORED`（不压缩）**：谱面含已压缩的音频/图片和加密 `.egg`，
  DEFLATE 在高熵数据上既慢又无收益，还可能挂死请求
- **一次性返回 + Content-Length**：`zipfile.ZipFile(BytesIO)` 已整体在内存，
  直接 `Response(bytes)`。**不要**用 `StreamingResponse`——同步文件对象按
  `\n` 迭代，14MB 的 zip 会被切成十几万 chunk（本地传输也要 5+ 分钟）
- **上限保护**：>500MB 谱面拒绝（413），防止后端被打爆

### 3.4 Python 后端 + 本地窗口

- **后端**：FastAPI + uvicorn（与 SaberLab 一致，生态成熟）；若追求打包最小
  可用纯 stdlib `http.server`（Phase 2 报告已对比）。绑定 `127.0.0.1` +
  **随机端口**（避免 8787 等固定端口冲突）。
- **窗口**（两种，推荐顺序）：
  1. **Chrome/Edge `--app` 窗口**（首选）：定位浏览器 → `--app=http://127.0.0.1:<port>`
     + 独立 `--user-data-dir`（隔离配置）+ 可固定窗口尺寸。WebGL2 性能/兼容最好
     （新工具已用 SwiftShader 截图验证渲染成功）
  2. **pywebview**（WebView2 嵌入）：更"原生"外观，但 WebGL2 性能弱于独立
     Chrome，需实测
- **进程管理**：服务器退出 → 清理窗口子进程；单实例锁（第二个实例提示退出）
  —— SaberLab `backend/host.py` 有完整模式可参考

---

## 4. 可复用资产清单（从 SaberLab 提取，含许可证）

| SaberLab 文件 | 用途 | 上游许可 | 复用方式 |
|---|---|---|---|
| `backend/bsor/parser.py` + `models.py` | BSOR v1 解析（纯函数，零外部耦合） | BS-Open-Replay **MIT** | 直接复制，保留文件头 MIT 声明（不要带 SaberLab GPL-3.0 头） |
| `backend/maps/resolver.py` | SongCore hash 算法、SongHashData.dat 解析、v2/v3 info 读取 | SongCore **MIT** | 提取 `compute_level_hash` / `read_level_info` / cache 解析 |
| `backend/main.py` `api_replay_raw` / `api_map_package` | 数据通道契约（§3.1/§3.3 的实现模板） | 逻辑照抄 | 重写为本地版（无 DB：文件表替代） |
| `backend/host.py` | 端口探测/单实例/uvicorn 线程/窗口/退出清理 | SaberLab 原创（GPL-3.0） | 仅**参考模式**，自行重写（勿复制代码） |

> ⚠️ 边界：SaberLab 本体是 GPL-3.0-or-later，但上表标注 **MIT 上游** 的文件
> 其代码源自 MIT 作品，可依 MIT 条款提取复用（保留上游声明即可）；原创部分的
> 实现模式只参考不复制。最稳妥：直接从上表中 MIT 上游仓库取原版，或从
> SaberLab 复制时去掉 GPL-3.0 相关头注释、保留 MIT 溯源。

---

## 5. 关键工程细节与坑（移植全过程的实证）

1. **前端静态化**：官方新版 Phase 1 已验证——`.output/public/index.html`
   资源为根路径相对引用，Python 从根 serve + SPA fallback 即可。
   ⚠️ 旧版（SaberLab 曾内置的移植版）是 `base=/chro/` 硬编码——若回退用旧版
   产物，要么挂 `/chro/` 路径、要么重建 `base: "./"`。**以官方新版为准**。
2. **replayUrl 编码**：整体 `encodeURIComponent`（URL 内含 `?`/`&`）。
3. **CORS**：本地 origin 进不了 BeatLeader 白名单（其 `ACAO` 只反射
   `chroviewer.com`）→ JSON API 走 `/bl/*` 反代；replay CDN 是 `*` 可直连。
   BeatSaver/ScoreSaber 均可直连（详见 ANALYSIS-REPORT §8.6）。
4. **LZMA**：ScoreSaber 回放 `.bsor` 可能 LZMA 压缩——前端已处理，后端
   **原样透传字节**即可，不要自作主张解压。
5. **note 判定平面（若未来做分析层）**：实证发现 BSOR 无 note 世界坐标，
   且 note 被切时 z≈1.37m（玩家面前 ~1.4m，判定平面不是 z=0）；重建中心
   用 x/y 网格公式 + `z = cutPoint.z` 可达 ~6mm 自洽（SimSaber 交叉验证）。
   对纯回放渲染层无影响（前端自己重建 note 运动），仅分析功能需要。
6. **jump 参数**：BSOR `info.jumpDistance / height / leftHanded / speed` +
   谱面 `NJS/BPM` 是前端重建 note 运动的输入——后端反推谱面时**顺带返回**
   info 元数据可简化前端（可选）。
7. **编码**：Windows GBK 控制台中文输出正常；管道重定向需 `flush=True` 并
   确认编码（PyInstaller 打包时尤其注意）。
8. **窗口/WebGL**：SwiftShader 软渲染可验证逻辑，真机 WebGL2 硬件加速
   才能验收性能；`--app` 模式记得独立 `--user-data-dir`（避免污染用户
   Chrome 配置、也能固定窗口大小）。
9. **音频**：谱面 `.egg`（加密音频）官方不处理，本地版直接随包透传即可
   （ChroViewer 对缺失/加密音频有降级）。

---

## 6. 推荐开发顺序（与 ANALYSIS-REPORT 的 Phase 对齐）

| 阶段 | 内容 | 状态/建议 |
|---|---|---|
| Phase 0 | 环境就绪（Node ≥24.15 / pnpm ≥11.20 / Python / Chrome） | ✅ 已核实 |
| Phase 1 | 静态化前端（`tanstackStart` 原生 prerender 一行配置） | ✅ 已验证（`.output/public/`） |
| Phase 2 | Python 服务器 4 能力（静态 + SPA fallback + `/api/source` + `/health`，可选 `/bl`） | 下一步 |
| Phase 3 | 启动器：Chrome `--app`（首选）/ pywebview（备选）+ 端口/退出管理 | 下一步 |
| Phase 4 | 本地化四机制：raw 端点 + 谱面反推（SongCore hash）+ map package + 本地源适配器 + 双击 `.bsor`/replay 库 | **本建议书 §3 重点** |
| Phase 5 | 仓库整理（`chroviewer-official/` fork + `server/` + `launcher/`）、推送 `Zircon10086/Local-ChroViewer`、双轨 Release | 收尾 |

Phase 2/3 可先于四机制跑通（在线源可用），四机制（Phase 4）是"本地优先"的
关键差异点，建议按 §3 顺序：raw 端点 → 谱面反推 → map package → 本地源 UI。

---

## 7. 许可证边界（红线）

- 前端 `chroviewer-official/`：**GPL-2.0-only**，保留 `LICENSE` +
  `ATTRIBUTIONS.md`（ChroMapper 衍生署名是法律义务）
- 后端 `server/` + `launcher/`：全新代码，建议 **GPL-2.0**（与前端同仓库
  同许可最省事）或 MIT（需独立目录 + 声明）；**禁止**复制 SaberLab 的
  GPL-3.0 原创代码（host.py 模式只参考）
- 复用 MIT 上游（BS-Open-Replay / SongCore）的代码：保留上游许可声明，
  与 GPL-2.0 兼容 ✓
- 分发形态与 SaberLab 插件系统的关系：本项目的 `dist` 产物即 SaberLab
  `plugins/chro/` 的插件内容源——保持"独立作品"身份，发布描述声明 GPL-2.0

---

## 8. 参考索引

- `C:\Users\ZiRCON\Desktop\Local-ChroViewer\ANALYSIS-REPORT.md` —— 官方代码
  结构/修改清单/风险（新工具产出，权威）
- `C:\Users\ZiRCON\Desktop\Local-ChroViewer\chroviewer-official\` —— 官方 fork
- `C:\Users\ZiRCON\Desktop\SaberLab\backend\bsor\parser.py` —— BSOR 解析（MIT）
- `C:\Users\ZiRCON\Desktop\SaberLab\backend\maps\resolver.py` —— hash/缓存（MIT）
- `C:\Users\ZiRCON\Desktop\SaberLab\backend\main.py` §3D replay data channel ——
  raw / map package 端点模板
- `C:\Users\ZiRCON\Desktop\SaberLab\backend\host.py` —— 端口/单实例/窗口模式参考
- `C:\Users\ZiRCON\Desktop\SaberLab\_ref\SimSaber\` —— note 运动/判定研究参考
- `C:\Users\ZiRCON\Desktop\SaberLab\docs\HANDOFF.md` §4.20/§4.21/§10 ——
  移植与插件化全过程记录
