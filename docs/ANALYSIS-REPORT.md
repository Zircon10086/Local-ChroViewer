# Local-ChroViewer 官方代码分析报告

> 分析对象:https://github.com/Umbranoxio/chroviewer (commit `dd01022`)
> 本地代码:`web/` (本报告同级目录)
> 目标:把官方 ChroViewer 移植为"Python 后端 + 本地 webview 窗口"的独立运行版

---

## 一、项目本质

**ChroViewer 是一个 Beat Saber 谱面 + 回放(Replay)浏览器查看器**,前端渲染引擎移植自 ChroMapper(Unity),用 Three.js (WebGL) 重建了游戏内渲染管线。

**技术栈**:React 19 + TanStack Start + Nitro(Node 服务端)+ Three.js 0.185 + protobuf(Ludus 直播协议)+ LZMA(回放解压)。许可证 **GPL-2.0**(衍生自 ChroMapper 的渲染代码,作者已授权移植)。

**一句话架构**:几乎 100% 的功能都在浏览器内核中运行;服务器只做静态外壳 + 少量数据通道。这正是"Python 后端 + 本地窗口"可行的根本原因。

---

## 二、官方实现原理

### 2.1 数据流(谱面加载三条路径)

```
路径A 本地文件(核心卖点):
  拖拽/选择 zip/dat/bsor → 浏览器内 fflate 解压 zip → Web Worker 解析 Info.dat +
  v2/v3/v4/GLS 难度文件(parse-v2/v3/v4, 支持 NoodleExtensions/Chroma)
  → OPFS(浏览器文件系统)缓存 → Three.js 渲染

路径B 在线源(浏览器内核直连):
  搜索/输入 → fetch BeatSaver / ScoreSaber / BeatLeader 的 JSON API
  → zip/replay 二进制直连 CDN 下载 → 同路径A解析渲染

路径C 分享链接(?map= / ?scoreId= / ?replayUrl=):
  用户粘贴的任意 https 链接(非官方 CDN)→ 走本地服务器 /api/source 代理
  (因为第三方文件服务器大多没有 CORS 头)
```

### 2.2 直连的远程服务(实测 CORS 矩阵)

| 服务 | CORS 实测结果 | 本地版 |
|---|---|---|
| `api.beatsaver.com` (JSON API) | `Access-Control-Allow-Origin: *` | ✅ 直连 |
| `r2cdn.beatsaver.com` (谱面 zip) | `*` | ✅ 直连 |
| `scoresaber.com` (API + replay 下载) | 反射任意 Origin | ✅ 直连 |
| `api.beatleader.com` (JSON API) | **只反射 `https://chroviewer.com`,其他 Origin 无 CORS 头** | ❌ 必须本地代理或禁用 |
| `ludus-1.scoresaber.com` (直播/观战 WebSocket) | WebSocket 无 CORS 机制 | ✅ 直连 |

> BeatLeader 是唯一硬伤:官方站点能直连是因为它被写进了 BeatLeader 的 Origin 白名单。
> 本地版(任意 localhost origin)会被 CORS 拦截。解法:Python 加一个 `/bl/*` 反向代理,
> 构建时把 `VITE_BEATLEADER_API_URL` 指向本地代理;或 `VITE_ENABLED_SOURCES=beatsaver,scoresaber` 关掉它。

### 2.3 渲染引擎(浏览器内核内,与服务器无关)

- `src/renderer/` — Three.js 场景:环境(142 个官方环境,66MB 静态资产在 `public/environments`)、材质/Shader(自定义 GLS 灯光、Bloom 泛光、平面镜面反射、雾)、note/saber/头显 3D 模型、Replay HUD(计分、连击、飞分)
- `src/core/` — 纯逻辑:beatmap 解析(v2/v3/v4 + GLS + 谱面信息)、回放解析(ScoreSaber .bsor LZMA 解压 / BeatLeader)、时间轴/时钟、hitsound、打分重算、NoodleExtensions 运行时、分享链接编解码
- `src/modules/` — React UI:查看器外壳、传输控制(时间轴/变速/灯光秀)、设置抽屉(画质/相机/音频偏移校准)、共享面板
- `src/sources/` — 在线源适配器(zod 校验 + 下载进度 + OPFS 缓存)

### 2.4 服务器(Nitro)职责盘点 —— Python 替换的核心依据

| 服务器功能 | 文件 | 本地版需求 |
|---|---|---|
| ① 页面 HTML 外壳(SSR) | TanStack Start 默认 | **主路由已 `ssr: false`**(`routes/index.tsx`),页面纯客户端渲染;只需构建时预渲染一个静态 `index.html` 外壳 |
| ② `/api/source?url=` 代理 | `server/source-proxy.ts` | **必须用 Python 重写**(粘贴链接/分享链接下载 zip/replay)。官方语义:仅 https、≤5 次重定向、256MB 上限、DNS 级 SSRF 防护 |
| ③ 社交分享 OG 图 + 标题 | `server/*-preview-*`、satori + resvg | **可砍**:本地版不需要社交卡片;`head()` 里的 serverFn 404 会被前端优雅降级 |
| ④ `/health` | `routes/health.ts` | 顺手实现 |
| ⑤ OPFS 图包缓存 | `sources/map-archive-cache.ts` | 纯浏览器内核端,自动生效 |

**结论:Python 只需提供静态外壳 + `/api/source` 代理 + (可选)BeatLeader 反代 + `/health`,其余全部照搬。**

---

## 三、移植实施记录(已完成)

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 环境 | Node 24.19 / pnpm 11.22 / Python 3.14 / WebView2 运行时 | ✅ |
| P1 静态化 | TanStack Start 原生 prerender → `.output/public/index.html` + 静态资源 | ✅ 实测 |
| P2 Python 服务器 | FastAPI:静态 + SPA fallback + `/api/source` + `/health` + 本地谱面/回放通道 | ✅ 实测 |
| P3 本地窗口 | pywebview(WebView2)窗口 + 端口 4680 顺延 + 双击 .bsor | ✅ 实测 |
| P4 本地优先 | 前端 `resolveLocalFirst` + 后端 hash 反推/下载缓存 | ✅ 实测 |
| P5 打包 | PyInstaller 单 exe(`--noconsole`)+ Release zip | ✅ 实测 |

### P1 关键结论

1. 官方 nitro 的 `prerender` 与 TanStack Start 不兼容(0 routes + 404);正确姿势是 TanStack Start 原生 prerender:
   ```ts
   tanstackStart({
     rsc: { enabled: true },
     prerender: { enabled: true, filter: (page) => page.path === '/' },
   })
   ```
2. `.output/public/index.html` 资源全部根路径相对引用,Python 服务器从根 serve + SPA fallback 即可
3. `head()` 元数据是构建时预渲染的(无 ?map= 参数时零网络调用),社交 serverFn 在本地服务器上 404 被优雅降级

---

## 四、修改哪些官方部分

| # | 文件 | 改动 | 状态 |
|---|---|---|---|
| 1 | `vite.config.ts` | `tanstackStart()` 加 `prerender`(静态化) | ✅ |
| 2 | `src/sources/local/provider.ts`(新增) | 本地源适配器(`/api/maps/{hash}/package`) | ✅ |
| 3 | `src/modules/viewer/use-viewer-remote-source.ts` | `resolveLocalFirst` 本地优先,替换全部 5 处找谱面调用 | ✅ |
| 4 | `src/routes/index.tsx` | 删除 `head()` 社交 meta 逻辑(约 120 行)+ 3 个 preview serverFn | 待做(可选) |
| 5 | `package.json` | 移除 satori/resvg 等仅社交卡片用依赖(减包体) | 待做(可选) |
| 6 | 品牌:标题/logo/i18n 中 "ChroViewer" 字样 | 改为 "Local-ChroViewer"(保持 GPL 署名) | 待做(可选) |

**不改的东西**:`src/core/`(解析、时钟、回放、分享链接)、`src/renderer/`(全部渲染)、`src/modules/viewer/`(查看器 UI)、`src/sources/`(在线源适配器)、`public/`(66MB 环境资产)、OPFS 缓存、i18n 16 语言。

---

## 五、保留哪些官方功能(完整清单)

1. **本地谱面查看**:拖拽/选择 zip 或 Info.dat+难度文件,支持 v2/v3/v4 + GLS + 多难度/多特性切换
2. **在线搜索与加载**:BeatSaver(直连 ✓)、ScoreSaber(直连 ✓)搜索、排行榜、谱面下载,OPFS 缓存自动生效
3. **回放查看**:ScoreSaber `.bsor`(LZMA 解压)+ BeatLeader 回放,完整打分/HUD/连击/飞分重算、legacy 文件名识别
4. **完整渲染引擎**:官方环境库(142 个)、自定义灯光事件(GLS/Chroma)、Bloom、镜面反射、雾效、画质分级
5. **查看器全部交互**:时间轴、变速、按拍步进、灯光秀开关、多视角(预览相机/回放相机/正射投影)、音频偏移校准、hitsound
6. **分享链接** 编解码(`?map=`/`?scoreId=`/`?replayUrl=` + settings)
7. **设置持久化**(localStorage)+ i18n 全语种
8. GPL-2.0 合规:保留 `LICENSE`、`ATTRIBUTIONS.md`(ChroMapper 衍生署名是法律义务)

**本地版裁掉**:社交 OG 卡片(3 个 serverFn + satori/resvg)、Docker 部署形态、多用户公网服务器能力。

---

## 六、风险与对策(已解决项)

| 风险 | 状态 | 对策 |
|---|---|---|
| Nitro prerender 静态化兼容 | ✅ 已解决 | TanStack Start 原生 prerender(见 P1) |
| BeatLeader replay 文件 CDN CORS | ✅ 已实测 `ACAO: *` | 直连,无需代理 |
| Ludus WebSocket Origin 检查 | 低 | 官方即直连,大概率放行;失败则本地版禁用观战/直播 |
| pywebview(WebView2)WebGL2 兼容 | ✅ 已实测 | 本地窗口完整渲染(自动化验证截图) |
| Node/pnpm 版本锁 | ✅ | 本机满足;CI 用 vite-plus 镜像 |
| windowed 打包 stdio 为 None | ✅ 已解决 | launcher 重定向 stdout/stderr 到 `data/logs/launcher.log` + uvicorn `log_config=None` |

---

## 七、结论

官方 ChroViewer 是"**浏览器内核做一切,服务器打杂**"的架构:渲染、解析、回放、缓存全在客户端,服务器只剩静态外壳 + URL 代理 + 社交卡片。本地移植版 = 静态化前端 + Python 后端(FastAPI)+ pywebview 本地窗口,已全部落地并实测通过(见 DESIGN-REPORT.md 实施记录)。

---

## 八、BeatLeader 白名单机制剖析

> 结论先行:**白名单是"开了带凭证请求(AllowCredentials)之后的浏览器强制要求" + "API 资源准入治理"双重原因;不是单纯的防爬墙。**

### 8.1 机制长什么样(源码 + 实测证据)

BeatLeader API 后端开源(`BeatLeader/beatleader-server`),CORS 策略在 `Startup.cs:491-498`:

```csharp
services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins, builder => {
        builder.WithOrigins(Configuration.GetSection("CORS").Get<string[]>())
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();   // ← 关键
    });
});
```

- 白名单是**配置数组**(生产环境用环境变量/密钥注入,不提交仓库)
- 实测响应:命中白名单 → `Access-Control-Allow-Origin: <该origin>` + `Vary: Origin`;未命中 → 无 CORS 头
- **实测放行的域**:`beatleader.com`、`beatleader.xyz`(自家)、`scoresaber.com`、`chroviewer.com`;拒绝:beatsaver.com、bsaber.com、`http://127.0.0.1:*`
- 只有 **JSON API(`api.beatleader.com`)有白名单**;replay 文件 CDN(`cdn.replays.beatleader.com`)实测 `Access-Control-Allow-Origin: *`

### 8.2 目的一:技术必然性(直接原因)—— AllowCredentials 与浏览器规范

`AllowCredentials()` 意味着响应允许携带**凭证**(Cookie / Authorization)。浏览器规范硬性规定:当响应带 `Access-Control-Allow-Credentials: true` 时,`Access-Control-Allow-Origin` **禁止使用 `*`**,必须显式列出具体 origin。BeatLeader 的 API 支持登录态(Steam OAuth、用户 cookie),**白名单不是"选择",而是保留凭证功能后浏览器允许的唯一形态**。对比:BeatSaver 全公开数据、不需要凭证,所以能用 `*`。

### 8.3 目的二:API 资源准入治理(运营原因)

- BeatLeader 的 API 完全免费,后端成本由他们承担;白名单让"哪些网站的前端在直接消费我的 API"完全可见、可审计、可随时撤销
- 第三方要接入就得**申请/协商**(ChroViewer 显然走的就是这条路)
- 白名单按"域名"粒度,连自家开发端口(8888/9999/5173)都留着,说明它是**运营台账**

### 8.4 目的三:安全收窄面(顺带收益)

如果 API 支持 cookie 认证且 CORS 全开,任何恶意网页都能借用户浏览器的登录态跨域读取/操作数据。白名单把"能带凭证跨域调用"的站点限定在可信任名单内。

### 8.5 目的四:生态合作而非封锁(为什么 scoresaber.com 也在)

两个长期"竞品"排行榜站点互相出现在对方白名单,说明这是**数据互操作需求**(BL 支持导入/同步 ScoreSaber 成绩等),不是竞争封锁。beatsaver.com / bsaber.com 不在名单,只是没有跨域调 BL API 的需求。

### 8.6 对 Local-ChroViewer 的意义

1. 本地 origin 不可能进白名单——不要申请,没意义;但**恰好也没必要**:
   - BeatLeader **JSON API** → Python 服务器加一个 `/bl/*` 反向代理(构建时 `VITE_BEATLEADER_API_URL=http://127.0.0.1:<port>/bl`),服务端转发无 CORS 限制
   - BeatLeader **replay 文件** → CDN 是 `*`,直连即可,**无需代理**(已实测)
2. 这印证了架构哲学:"能直连的直连,不能直连的服务端中转"——本地版照搬同一哲学,中转者是 Python。
3. 若某天 BeatLeader 调整策略(如 CDN 也上白名单),兜底现成:把 replayUrl 走 `/api/source`(官方代码该通道已存在)。
