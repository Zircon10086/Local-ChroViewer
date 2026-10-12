import { Result } from 'better-result';

import { extractMapArchive } from '../archive';
import { requestArrayBuffer } from '../http';
import { SourceError, sourceError } from '../source-error';
import type { BeatSaverMapSource, FetchRequest, SourceResult } from '../source-types';

/**
 * 本地源适配器(本地优先,云端兜底):
 * 请求本地后端 GET /api/maps/{hash}/package。
 * 后端语义:本地 CustomLevels 命中 → 直接打包;未命中 → 自动从 BeatSaver
 * 下载并缓存到项目缓存区(data/map-cache/),前端无感。
 *
 * 下载期间(onProgress 提供时)轮询 GET /api/maps/{hash}/progress,
 * 让 UI 能显示后端下载进度,而不是"看起来卡住"。
 */

export interface LocalMapResolveOptions {
  onProgress?: (progress: number | null) => void;
  request?: FetchRequest;
  signal?: AbortSignal;
}

/** 轮询本地后端下载进度,下载完成(ready)或请求结束即停。 */
function pollLocalMapProgress(
  hash: string,
  onProgress: (progress: number | null) => void,
  request: FetchRequest,
  signal?: AbortSignal,
) {
  let stopped = false;
  const timer = window.setInterval(() => {
    if (stopped) return;
    request(`/api/maps/${hash}/progress`, { signal })
      .then((response) => {
        if (!response.ok) return;
        return response.json().then((info: { state?: string; progress?: number | null }) => {
          if (stopped) return;
          if (typeof info.progress === 'number') onProgress(info.progress);
          if (info.state === 'ready') onProgress(1);
        });
      })
      .catch(() => {});
  }, 500);
  return {
    stop() {
      stopped = true;
      window.clearInterval(timer);
    },
  };
}

/**
 * Ask the backend to complete a level it does not have, then wait a little for it.
 *
 * A local-first backend (SaberLab) can fetch a missing level on its own — the player's deleted
 * custom map comes back from BeatSaver, a game level from the community archive of the game's
 * own levels. It exposes that as `POST /api/maps/{id}/ensure-preview`; the answer is immediate,
 * so this probes for the package afterwards instead of trusting a single status.
 *
 * Responds silently when the backend does not offer the endpoint (a plain ChroViewer server):
 * the caller then reports the original "map not found", which is the correct answer there.
 * Paid DLC levels are not distributed anywhere and keep failing — that is the backend's answer
 * to give, and it is not this function's job to hide it.
 */
async function requestMissingMapFill(hash: string, request: FetchRequest, signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await request(`/api/maps/${encodeURIComponent(hash)}/ensure-preview`, {
      method: 'POST',
      signal,
    });
    if (!response.ok) return false;
    const info = (await response.json()) as { status?: string; reason?: string };
    return info.status === 'ok';
  } catch {
    return false;
  }
}

/** Poll the package endpoint until it answers, or give up. Returns whether it arrived. */
async function waitForFilledMap(
  hash: string,
  request: FetchRequest,
  attempts: number,
  signal?: AbortSignal,
): Promise<boolean> {
  for (let i = 0; i < attempts; i += 1) {
    if (signal?.aborted) return false;
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    try {
      const response = await request(`/api/maps/${encodeURIComponent(hash)}/package`, { signal });
      if (response.ok) return true;
    } catch {
      // keep waiting: a fetch that has not finished downloading yet is the normal case here
    }
  }
  return false;
}

export async function fetchLocalMap(
  hash: string,
  options: LocalMapResolveOptions = {},
): Promise<SourceResult<BeatSaverMapSource>> {
  // The identity is a custom level's 40-hex hash or, for a game level (OST/DLC), its level id
  // (`custom_level_SPINETERNALLY` in a replay, stored by the backend under the bare id). Both
  // are asked for the same way; the case is left as it arrived, because a level id is not
  // case-insensitive by definition — a local-first backend looks it up itself.
  const normalized = hash.trim().replace(/^custom_level_/i, '');
  if (!/^([0-9a-f]{40}|[0-9a-z]+)$/i.test(normalized)) {
    return Result.err(
      new SourceError({
        message: 'invalid map hash',
        source: 'local',
        operation: 'parse-map-hash',
      }),
    );
  }

  const request = options.request ?? ((input, init) => fetch(input, init));
  const polling =
    options.onProgress === undefined
      ? null
      : pollLocalMapProgress(normalized, options.onProgress, request, options.signal);

  try {
    const download = () =>
      requestArrayBuffer(`/api/maps/${normalized}/package`, {
        source: 'local',
        label: `Local map ${normalized}`,
        operation: 'download-local-map',
        onProgress: options.onProgress,
        request,
        signal: options.signal,
      });

    let data = await Result.tryPromise({
      try: download,
      catch: (cause) =>
        sourceError(cause, {
          message: cause instanceof Error ? cause.message : 'local map could not be loaded',
          source: 'local',
          operation: 'download-local-map',
        }),
    });
    if (data.isErr()) return data;
    // Missing here: let the backend complete the level (the feature SaberLab calls
    // "补全丢失谱面"), then download it for real. One round is enough — the loop lives in the
    // backend task, and a second attempt here would only duplicate it.
    if (data.value.isErr() && (await requestMissingMapFill(normalized, request, options.signal))) {
      if (await waitForFilledMap(normalized, request, 60, options.signal)) {
        data = await Result.tryPromise({
          try: download,
          catch: (cause) =>
            sourceError(cause, {
              message: cause instanceof Error ? cause.message : 'local map could not be loaded',
              source: 'local',
              operation: 'download-local-map',
            }),
        });
        if (data.isErr()) return data;
      }
    }
    if (data.value.isErr()) return data.value;

    const files = await extractMapArchive(new Uint8Array(data.value.value));
    if (files.isErr()) return files;
    if (!files.value.some((file) => file.name.toLowerCase() === 'info.dat')) {
      return Result.err(
        new SourceError({
          message: 'local map package has no Info.dat',
          source: 'local',
          operation: 'validate-local-map-archive',
        }),
      );
    }
    return Result.ok({ key: normalized, hash: normalized, files: files.value });
  } finally {
    polling?.stop();
  }
}
