# Local-ChroViewer: Upstream Code Analysis Report

> Analyzed: https://github.com/Umbranoxio/chroviewer (commit `dd01022`)
> Local code: `web/` (sibling of this report)
> Goal: port upstream ChroViewer into a standalone local app — Python backend
> + native webview window.

---

## 1. What the project is

**ChroViewer is a Beat Saber map & replay viewer** whose rendering engine was
ported from ChroMapper (Unity) and rebuilt in Three.js (WebGL) inside a browser
kernel.

**Stack**: React 19 + TanStack Start + Nitro (Node server) + Three.js 0.185 +
protobuf (Ludus live protocol) + LZMA (replay decompression). License:
**GPL-2.0** (derived from ChroMapper's rendering code, porting approved by the
author).

**One-line architecture**: almost 100% of the functionality runs inside the
browser kernel; the server only provides a static shell and a few data
channels. This is exactly why a "Python backend + local webview window" port
is feasible.

---

## 2. How the upstream works

### 2.1 Data flows (three map-loading paths)

```
Path A  Local files (core feature):
  drag/drop or pick zip/dat/bsor → in-kernel fflate unzip → Web Worker parses
  Info.dat + v2/v3/v4/GLS difficulty files (NoodleExtensions/Chroma supported)
  → OPFS (browser file system) cache → Three.js rendering

Path B  Online sources (direct from the browser kernel):
  search/input → fetch BeatSaver / ScoreSaber / BeatLeader JSON APIs
  → zip/replay binaries downloaded directly from CDNs → same pipeline as Path A

Path C  Shared links (?map= / ?scoreId= / ?replayUrl=):
  arbitrary https links pasted by the user (non-official CDNs) → go through
  the local server's /api/source proxy (third-party file servers usually lack
  CORS headers)
```

### 2.2 Directly-connected remote services (measured CORS matrix)

| Service | Measured CORS | Local port |
|---|---|---|
| `api.beatsaver.com` (JSON API) | `Access-Control-Allow-Origin: *` | ✅ direct |
| `r2cdn.beatsaver.com` (map zips) | `*` | ✅ direct |
| `scoresaber.com` (API + replay downloads) | reflects any Origin | ✅ direct |
| `api.beatleader.com` (JSON API) | **only reflects `https://chroviewer.com`** | ❌ local proxy or disable |
| `ludus-1.scoresaber.com` (live/watch WebSocket) | WebSockets have no CORS mechanism | ✅ direct |

> BeatLeader is the only hard case: the official site works because it is on
> BeatLeader's Origin whitelist. A local origin gets blocked by the browser.
> Fix: a `/bl/*` reverse proxy in Python with
> `VITE_BEATLEADER_API_URL` pointed at it, or drop the source via
> `VITE_ENABLED_SOURCES=beatsaver,scoresaber`.

### 2.3 Rendering engine (inside the browser kernel, server-independent)

- `src/renderer/` — Three.js scene: environments (142 official environments,
  66 MB static assets in `public/environments`), materials/shaders (custom GLS
  lighting, bloom, planar mirror, fog), note/saber/headset 3D models, replay
  HUD (score, combo, flying score)
- `src/core/` — pure logic: beatmap parsing (v2/v3/v4 + GLS + info), replay
  parsing (ScoreSaber .bsor LZMA / BeatLeader), timeline/clock, hitsounds,
  score recomputation, NoodleExtensions runtime, share-link codec
- `src/modules/` — React UI: viewer shell, transport controls (timeline/speed/
  lightshow), settings drawer (quality/camera/audio-offset calibration), share
  panel
- `src/sources/` — online source adapters (zod validation + download progress
  + OPFS cache)

### 2.4 Server (Nitro) responsibilities — the basis for the Python replacement

| Server function | Files | Needed locally? |
|---|---|---|
| ① HTML shell (SSR) | TanStack Start default | **main route is already `ssr: false`** (`routes/index.tsx`); only a prerendered static `index.html` shell is needed |
| ② `/api/source?url=` proxy | `server/source-proxy.ts` | **must be rewritten in Python** (link/shared downloads). Upstream semantics: https-only, ≤5 redirects, 256 MB cap, DNS-level SSRF blocking |
| ③ Social OG images + titles | `server/*-preview-*`, satori + resvg | **droppable** (no social cards locally); `head()` serverFns 404 → graceful degradation |
| ④ `/health` | `routes/health.ts` | trivial |
| ⑤ OPFS map archive cache | `sources/map-archive-cache.ts` | client-side, automatic |

**Conclusion: Python only needs a static shell + `/api/source` proxy +
(optional) BeatLeader reverse proxy + `/health`. Everything else is carried
over as-is.**

---

## 3. Port implementation record (all verified)

| Phase | Content | Status |
|---|---|---|
| P0 | Environment: Node 24.19 / pnpm 11.22 / Python 3.14 / WebView2 | ✅ |
| P1 | Static prerender → `.output/public/index.html` + assets | ✅ verified |
| P2 | Python server: static + SPA + `/api/source` + `/health` + local replay/map channels | ✅ verified |
| P3 | pywebview (WebView2) window, port 4680 fallback, double-click .bsor | ✅ verified |
| P4 | Frontend `resolveLocalFirst` + backend hash resolution / download cache | ✅ verified |
| P5 | PyInstaller single exe (`--noconsole`) + release zip | ✅ verified |

### P1 key findings

1. Nitro's `prerender` does not work with TanStack Start (0 routes + 404); the
   correct approach is TanStack Start's native prerender:
   ```ts
   tanstackStart({
     rsc: { enabled: true },
     prerender: { enabled: true, filter: (page) => page.path === '/' },
   })
   ```
2. All assets in `.output/public/index.html` are root-relative; a Python
   server serving from root with SPA fallback is sufficient.
3. `head()` metadata is prerendered at build time (zero network calls without
   `?map=` params); social serverFns 404 gracefully on the local server.

---

## 4. Upstream modifications made

| # | File | Change | Status |
|---|---|---|---|
| 1 | `vite.config.ts` | `tanstackStart()` prerender (static shell) | ✅ |
| 2 | `src/sources/local/provider.ts` (added) | local source adapter (`/api/maps/{hash}/package`) | ✅ |
| 3 | `src/modules/viewer/use-viewer-remote-source.ts` | `resolveLocalFirst` local-first; replaces all 5 map-resolution call sites | ✅ |
| 4 | `src/routes/index.tsx` | remove `head()` social meta (~120 lines) + 3 preview serverFns | optional |
| 5 | `package.json` | drop satori/resvg deps (smaller bundle) | optional |
| 6 | Branding (title/logo/i18n "ChroViewer") | rename to "Local-ChroViewer" (keep GPL attribution) | optional |

**Untouched**: `src/core/` (parsing, clock, replay, share links),
`src/renderer/` (all rendering), `src/modules/viewer/` (viewer UI),
`src/sources/` (online adapters), `public/` (66 MB environment assets), OPFS
cache, 16-language i18n.

---

## 5. Upstream features kept (complete list)

1. **Local map viewing**: drag/pick zip or Info.dat+difficulty files; v2/v3/v4
   + GLS; multi-difficulty/multi-characteristic switching
2. **Online search & loading**: BeatSaver (direct ✅), ScoreSaber (direct ✅)
   search, leaderboards, map downloads with automatic OPFS cache
3. **Replay viewing**: ScoreSaber `.bsor` (LZMA) + BeatLeader replays, full
   score/HUD/combo/flying-score recomputation, legacy filename recognition
4. **Full rendering engine**: 142 official environments, custom lighting events
   (GLS/Chroma), bloom, planar mirror, fog, quality tiers
5. **Full viewer interactions**: timeline, playback speed, beat stepping,
   lightshow toggle, multiple cameras (preview/replay/ortho), audio-offset
   calibration, hitsounds
6. **Share-link codec** (`?map=`/`?scoreId=`/`?replayUrl=` + settings)
7. **Settings persistence** (localStorage) + full i18n
8. **GPL-2.0 compliance**: `LICENSE` + `ATTRIBUTIONS.md` preserved
   (ChroMapper attribution is a legal obligation)

**Dropped**: social OG cards (3 serverFns + satori/resvg), Docker deployment,
multi-user public-server capabilities.

---

## 6. Risks & mitigations (resolved items)

| Risk | Status | Mitigation |
|---|---|---|
| Nitro prerender static-shell compatibility | ✅ resolved | TanStack Start native prerender (P1) |
| BeatLeader replay-file CDN CORS | ✅ measured `ACAO: *` | direct, no proxy |
| Ludus WebSocket Origin checks | low | official site connects directly; disable live/watch locally if blocked |
| pywebview (WebView2) WebGL2 | ✅ verified | full rendering in the local window (automated screenshots) |
| Node/pnpm version pins | ✅ | local environment satisfies; CI uses the vite-plus image |
| windowed build has no stdio | ✅ resolved | launcher redirects stdout/stderr to `data/logs/launcher.log` + uvicorn `log_config=None` |

---

## 7. Conclusion

Upstream ChroViewer is "**the browser kernel does everything, the server does
the chores**": rendering, parsing, replays and caching all run client-side;
the server is only a static shell + URL proxy + social cards. The local port
= static frontend + Python backend (FastAPI) + pywebview local window, all
implemented and verified (see DESIGN-REPORT.md).

---

## 8. BeatLeader whitelist mechanism

> Bottom line: the whitelist exists because of **the browser-mandated
> constraint of credentialed requests (AllowCredentials) + API resource
> governance** — not simply anti-scraping.

### 8.1 What it looks like (source + measured evidence)

BeatLeader's API backend is open source (`BeatLeader/beatleader-server`); the
CORS policy lives in `Startup.cs:491-498`:

```csharp
services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins, builder => {
        builder.WithOrigins(Configuration.GetSection("CORS").Get<string[]>())
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();   // ← the key
    });
});
```

- The whitelist is a **config array** (production values injected via env
  vars/secrets, not committed)
- Measured responses: whitelisted origin → `Access-Control-Allow-Origin:
  <origin>` + `Vary: Origin`; otherwise no CORS headers
- **Measured whitelist**: `beatleader.com`, `beatleader.xyz` (own sites),
  `scoresaber.com`, `chroviewer.com`; rejected: beatsaver.com, bsaber.com,
  `http://127.0.0.1:*`
- Only the **JSON API (`api.beatleader.com`)** is whitelisted; the replay-file
  CDN (`cdn.replays.beatleader.com`) measured `Access-Control-Allow-Origin: *`

### 8.2 Reason 1: technical necessity — AllowCredentials vs the browser spec

`AllowCredentials()` means responses may carry **credentials** (cookies /
Authorization). The browser spec mandates: when a response has
`Access-Control-Allow-Credentials: true`, `Access-Control-Allow-Origin` **may
not be `*`** — it must list explicit origins. BeatLeader's API supports
signed-in state (Steam OAuth, user cookies), so the whitelist is **the only
legal form once credentials are enabled**. BeatSaver needs no credentials, so
it can use `*`.

### 8.3 Reason 2: API resource governance (operational)

- The API is free; BeatLeader bears the backend costs. The whitelist keeps
  "which site's frontend consumes my API" visible, auditable and revocable.
- Third parties must **apply/negotiate** (ChroViewer evidently did).
- Domain-granular, even including their dev ports (8888/9999/5173) — it is an
  operational ledger.

### 8.4 Reason 3: security surface (side benefit)

If the API allowed credentials with wide-open CORS, any malicious page could
read/act on user data with the user's browser session. The whitelist limits
credentialed cross-origin calls to trusted sites.

### 8.5 Reason 4: ecosystem cooperation, not blocking (why scoresaber.com is on it)

Two "rival" leaderboard sites appear on each other's whitelists — that is
**data-interop need** (BL imports/syncs ScoreSaber scores), not competitive
blocking. beatsaver.com / bsaber.com simply have no need to call BL's API.

### 8.6 Implications for Local-ChroViewer

1. A local origin will never join the whitelist — don't bother applying; but
   it's **not needed anyway**:
   - BeatLeader **JSON API** → `/bl/*` reverse proxy in Python
     (`VITE_BEATLEADER_API_URL=http://127.0.0.1:<port>/bl`); server-side
     forwarding has no CORS limits
   - BeatLeader **replay files** → CDN is `*`, direct download, **no proxy**
     (verified)
2. This confirms the architecture philosophy: "connect directly where
   possible, proxy otherwise" — the local port follows it, with Python as the
   proxy.
3. If BeatLeader ever tightens the CDN too, the fallback already exists: route
   replayUrl through `/api/source` (the upstream channel is already there).
