# Local-ChroViewer: Design Report (validated against SaberLab practice)

> Date: 2026-08-24
> Inputs: ① SaberLab project code, verified item by item ② upstream ChroViewer
> code (Phase 1 verified)
> Goal: double-click an exe (no console window) → a local webview window pops
> up; read local `.bsor` replays, resolve the map by hash locally, bypass the
> network.

---

## 1. SaberLab practice validation (all passed)

Every SaberLab asset referenced below was actually read and verified — the
practices match the real code and can be used as an implementation blueprint:

| Asset | Verified result |
|---|---|
| `backend/bsor/parser.py` + `models.py` | ✅ BSOR v1 binary parser, strictly aligned with the official C# ReplayDecoder (magic 0x442D3D69, 7 section types, official playerName UTF-16 length-prefix bug repair) |
| `backend/maps/resolver.py` | ✅ `compute_level_hash()` = SongCore algorithm; **SHA1(info.dat bytes + each difficulty .dat in `_difficultyBeatmapSets` order) → uppercase HEX**; `load_songcore_cache()` reads the game's own `UserData/SongCore/SongHashData.dat` |
| `backend/main.py` endpoints | ✅ contract matches: `/api/replays/{id}/raw` (FileResponse, raw bytes) + `/api/maps/{hash}/package` (**ZIP_STORED** + one-shot `Response(bytes)` + 500 MB cap → 413) |
| `backend/host.py` | ✅ port probing, uvicorn thread + readiness polling, window failure fallback, restart child process, PyInstaller passes the `app` object (not an import string) |
| `packaging/saberlab.spec` | ✅ PyInstaller onedir; `console=False` (windowed); `Tree()` for frontend assets |

---

## 2. Key techniques extracted from SaberLab

### 2.1 Local map resolution (the core)

```
BSOR info.songHash → local map library match → map package (zip)
→ existing frontend unpack/parse pipeline
```

- **Hash semantics (most important)**: BeatLeader's `songHash` is the SongCore
  level hash (SHA1 of info.dat + difficulty files in set order). SaberLab's
  `compute_level_hash()` is a ready-made implementation (from SongCore, MIT).
- **Three-tier matching**: ① `SongHashData.dat` cache (game-generated,
  instant) ② full `CustomLevels` scan with hash computation (mtime-skipped)
  ③ miss → network fallback or manual selection
- **Pitfalls learned**: scan lock, negative cache, mtime reuse

### 2.2 BSOR data channel

- Backend **passes bytes through only**; parsing is entirely frontend (upstream
  `?replayUrl=` contract; LZMA / BeatLeader formats already handled)
- `replayUrl` must be fully `encodeURIComponent`d (URLs contain `?`/`&`)
- Session file table (id → disk path) supports double-click opening

### 2.3 Three practical pitfalls (copy these)

1. **ZIP_STORED**: maps contain already-compressed audio/images + encrypted
   `.egg`; DEFLATE is slow and pointless, and can hang the request
2. **One-shot Response, not StreamingResponse**: a sync BytesIO iterates by
   `\n`, splitting a 14 MB zip into 100k+ chunks
3. **Windowed stdio**: with `console=False`, stdout/stderr are None and must be
   redirected (otherwise uvicorn's logging config crashes)

### 2.4 Launcher pattern (host.py)

Port probing (4680+19) → uvicorn thread → readiness polling → local window →
cleanup on exit; under PyInstaller, uvicorn must get the `app` object (import
strings are invisible in frozen environments)

---

## 3. Technology choices (final)

| Decision | Choice | Rationale |
|---|---|---|
| Backend | **FastAPI + uvicorn** (same as SaberLab) | FileResponse/Response ready-made, mature ecosystem |
| BSOR handling | **backend extracts only songHash (lightweight); full parse stays frontend** | frontend already parses; backend only needs the hash for resolution |
| Map library index | **JSON file cache + SongHashData.dat priority** | only needs hash→path mapping with mtime checks; no migration cost |
| Window | **pywebview (WebView2) local window — the only runtime** | native window, system file dialogs, WebGL2 verified |
| Double-click .bsor | exe accepts `argv[1]` → `POST /api/local/open` → window navigates | verified |
| Packaging | **PyInstaller onedir + `console=False`** | windowed = no console; single exe + release zip |
| Single instance / port | port probing (4680, fallback +19) | verified |
| Frontend local source | **`resolveLocalFirst` + local provider** | minimal change surface |

---

## 4. Target architecture (matches the shipped product)

```
Local-ChroViewer.exe  (PyInstaller windowed, console=False)
│
├─ launcher.py  ── port probing (4680, fallback) → uvicorn thread → readiness
│                  → pywebview (WebView2) window (1280x800)
│                  → argv[1]=.bsor → POST /api/local/open → navigate to replay
│                  → window closed → server stops
│
├─ server.py (FastAPI)
│   ├─ GET /*                     static assets (SPA fallback → index.html)
│   ├─ GET /api/source?url=…      upstream-semantics proxy (https/≤5 redirects/256MB/SSRF)
│   ├─ GET /bl/*                  [optional] BeatLeader JSON reverse proxy
│   ├─ GET /health
│   ├─ ── local capabilities ──
│   ├─ POST /api/local/open       {path} → {id}   (double-click .bsor)
│   ├─ GET  /replay/{id}/raw      BSOR bytes (FileResponse pass-through)
│   ├─ GET  /api/maps/{hash}/package    local zip; miss → BeatSaver download + cache
│   ├─ GET  /api/maps/{hash}/progress   download progress (polled by the UI)
│   └─ GET  /api/local/stats
│
├─ maps/ (resolver port, MIT attribution kept)
│   ├─ compute_level_hash()    SongCore algorithm
│   ├─ SongHashData.dat parse  priority
│   └─ CustomLevels scan + JSON cache + mtime reuse + scan lock
│
└─ frontend/  (web/.output/public, Phase 1 static output)
```

**Data flow (user double-clicks MyScore.bsor)**:
```
Windows double-click → Local-ChroViewer.exe MyScore.bsor
  → launcher starts server → POST /api/local/open {path} → {id}
  → server reads the first bytes of the .bsor → extracts songHash
  → resolver: SongHashData.dat → CustomLevels scan → folder hit
  → window navigates ?replayUrl=<enc>/replay/{id}/raw
  → frontend fetches /replay/{id}/raw, parses BSOR → replayMapHash → local
    source /api/maps/{hash}/package
  → fflate unpack → Web Worker parse → Three.js 3D replay (zero network)
```

---

## 5. Frontend changes (minimal, inside the upstream fork)

| File | Change |
|---|---|
| `src/sources/local/provider.ts` (added) | local source adapter: `/api/maps/{hash}/package` → `{key, hash, files}` (backend auto-fallback: local zip on hit; BeatSaver download+cache on miss) |
| `src/modules/viewer/use-viewer-remote-source.ts` | `resolveLocalFirst` (local-first, fallback to BeatSaver direct); replaces all 5 map-resolution call sites (drag/pick .bsor, file picker, shared links, SS/BL online replays, online search) |

> Key insight: upstream **already** supports "drag a .bsor without map files →
> resolve the map by hash" — it just resolves via BeatSaver. The local port
> only swaps that resolver to "local first". **Frontend change = 2 files.**

---

## 6. Implementation record (all verified)

### P1 Static frontend (✅)
TanStack Start native prerender (`prerender: { enabled: true, filter }`) →
`.output/public/index.html` (7.3 KB) + assets; Python static server + SPA
fallback + gzip precompression verified.

### P2 Server (✅)
`server/` (FastAPI): static serving, `/api/source`, `/health`,
`/api/local/open`, `/replay/{id}/raw`, `/api/maps/{hash}/package`,
`/api/local/stats`.
Real-environment verification (1031 local maps): path back-derivation correct;
SongHashData.dat + computed dual-channel index built instantly; local hit
10.7 MB zip / 4.4 s; miss → BeatSaver download 8.6 MB → `data/map-cache/`
cache → second request 3.6 s; replay bytes identical.

**BSOR dual-format discovery**: BeatLeader 0.9.33's info section differs from
standard BSOR — it starts with a `modVersion` string instead of an i32, and
the mapHash is the 10th string (with the official playerName UTF-16
length-prefix bug). `bsor_info.py` handles both formats.

**Hash semantics verified**: BeatLeader's `mapHash` = SongCore level hash
(matches BeatSaver). An old replay's hash differing from the current local map
means the map was updated — normal, covered by the fallback chain.

### P3 Local window (✅)
`server/launcher.py`: port 4680+19 fallback, uvicorn thread, pywebview
(WebView2) window, `js_api.pick_bsor()` system file dialog bridge, double-click
.bsor argv navigation, stop server on window close.
Automated verification (local dev tooling): window renders the launcher UI ✅;
`<input type=file>` opens the native Windows file dialog (filter
`*.dat;*.bsor;*.json`) ✅; navigation to replayUrl renders the full map
preview (song card/HUD/timeline) ✅.

### P4 Local-first (✅)
`fetchLocalMap` + `resolveLocalFirst` shipped; end-to-end: local .bsor →
`/replay/{id}/raw` → BSOR parse → local zip hit → 3D map preview, zero network.

### P5 Packaging (✅)
`scripts/build.py`: PyInstaller single exe (windowed, official ChroViewer logo
icon) → `GitHub_Build/v<version>/Local-ChroViewer-v<version>/` + **release
zip**; automatic .work cleanup; retry on locked files. Under frozen builds
`frontend/` and `data/` live next to the exe.

### Download-progress feedback (✅ 2026-08-25)

**Problem**: when a map is missing locally, the backend downloads it from
BeatSaver (30s+), and the file-source path (drag/pick .bsor) showed no UI
feedback — it looked frozen.

**Fix** (uses the official ViewerOverlay ring progress):
- Backend `server/main.py`: download progress table +
  `GET /api/maps/{hash}/progress` (state/received/total/progress, 5 min TTL),
  streamed byte counting
- Frontend `src/sources/local/provider.ts`: poll the progress endpoint (500 ms)
  during `fetchLocalMap`, report via `onProgress`
- Frontend `use-viewer-remote-source.ts` / `use-viewer-file-source.ts`:
  `resolveLocalFirst` accepts `requestId` → wires the official
  `sourceDownload` state; the drag/pick path now shows "Downloading map" +
  live progress ring

**Verified** (test replay whose map is absent locally, 15.4 MB download):
- During download: page state `"Downloading map"`, overlays: 1; screenshot
  shows the ring ~66% filled
- Backend progress: 0 → 2.3% → 19% → 63% → 100% (14 s)
- After caching, reopening renders the map preview instantly
  (`WACCA ULTRA DREAM MEGAMIX / USAO & Kobaryo`, see
  `docs/verification/cached-preview.png`)

---

## 7. Phase plan (final form)

| Phase | Content | Status |
|---|---|---|
| P0 | Environment (Node/pnpm/Python/WebView2) | ✅ |
| P1 | Static frontend (TanStack Start native prerender) | ✅ |
| P2 | Python server: 4 base capabilities + local replay/map channels | ✅ |
| P3 | pywebview window + port fallback + double-click .bsor | ✅ |
| P4 | Frontend local source (`resolveLocalFirst`, local-first) | ✅ |
| P5 | PyInstaller packaging + release zip | ✅ |
| P6 | SaberLab plugin distribution (`saberlab/chro`, GPL-2.0), branding, `/bl` proxy, GitHub release | ✅/pending |

---

## 8. SaberLab plugin distribution (saberlab/chro)

`saberlab/chro` is a **separate distribution** of this project built as a
plugin for SaberLab (Beat Saber replay-analysis tool, GPL-3.0-or-later).

**Why it lives here**: ChroViewer is `GPL-2.0-only`, incompatible with
SaberLab's `GPL-3.0-or-later`. Keeping the ChroViewer-derived code in this
repository — uniformly licensed **GPL-2.0-only** — avoids the license conflict
while SaberLab still consumes it as a plugin.

**Modifications vs upstream** (full list in
`saberlab/chro/MODIFICATIONS.en.md`):
- `src/sources/saberlab/provider.ts` added: SaberLab local map data source
  (`/api/maps/{hash}/package`, local-first, remote sources disabled by default)
- `src/routes/__root.tsx`: RootDocument as a fragment (document structure from
  index.html) — fixes a selectionchange infinite loop when combining React 19
  `createRoot(#root)` with `<html>/<head>/<body>` root tags
- `src/main.tsx`: pure client-side `createRoot(#root)` mount; removed
  diagnostic heartbeat logging
- Remote source entry points removed (`/api/source` rewrite, link-loading
  branch, source-picker link UI) — local-only
- Orphaned `environment-worker.ts` / `environment-worker-protocol.ts` removed
- 13 `[saberlab-trace]/[saberlab-exp]` log statements removed (defensive logic
  kept)
- `vite.config.ts`: default minify restored; `package.json` renamed
  `saberlab-chro`

**Build & integration**: `pnpm build` → `dist/`, mounted at `/chro/` by the
SaberLab backend; SaberLab's replay detail page embeds it in an iframe
(`/chro/?replayUrl=<origin>/api/replays/{id}/raw`).

---

## 9. License (red lines)

- Frontend fork: **GPL-2.0-only**, LICENSE + ATTRIBUTIONS.md preserved (legal
  obligation)
- `server/` + `launcher/`: new Python code, GPL-2.0 (same license as the
  frontend in one repository)
- `saberlab/chro` plugin: **GPL-2.0-only**, same as the rest of the project —
  never merge GPL-3.0 code into it
- MIT-upstream code reused (BS-Open-Replay / SongCore): keep the upstream
  notice, GPL-2.0-compatible ✓
- Distribution: release zip contains LICENSE / README / VERSION.txt

---

## 10. Risks & mitigations

| Risk | Level | Mitigation |
|---|---|---|
| BSOR songHash vs local hash mismatch | low | normalize both sides (uppercase HEX); fall back to network |
| CustomLevels first scan slow | medium | SongHashData.dat priority + mtime skip + background scan |
| `.egg` encrypted audio | low | pass through in the zip; upstream degrades gracefully |
| pywebview WebGL2 performance | low | rendering verified; hardware-accelerated acceptance on real hardware |
| windowed build hides errors | low | logs to `data/logs/launcher.log`; in-window error page |
| packaged dir locked by a running exe | low | build.py retries + warns |

---

## 11. Conclusion

SaberLab's practices were **verified against real code** and are fully
trustworthy. Core value:
1. **SongCore hash algorithm + SongHashData.dat cache** — the key to
   "bsor → local map" resolution
2. **Three transfer pitfalls** (ZIP_STORED / one-shot Response / windowed
   stdio) — avoided up front
3. **Tiny frontend surface**: one `resolveLocalFirst` swaps the upstream
   "bsor → find map by hash" path from network to local-first
4. All phases (P1-P5) shipped and verified; output is a single exe + release
   zip; the SaberLab plugin distribution lives at `saberlab/chro` under the
   same GPL-2.0-only license
