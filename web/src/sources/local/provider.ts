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

export async function fetchLocalMap(
  hash: string,
  options: LocalMapResolveOptions = {},
): Promise<SourceResult<BeatSaverMapSource>> {
  const normalized = hash.trim().toLowerCase();
  if (!/^[0-9a-f]{40}$/.test(normalized)) {
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
    const data = await Result.tryPromise({
      try: () =>
        requestArrayBuffer(`/api/maps/${normalized}/package`, {
          source: 'local',
          label: `Local map ${normalized}`,
          operation: 'download-local-map',
          onProgress: options.onProgress,
          request,
          signal: options.signal,
        }),
      catch: (cause) =>
        sourceError(cause, {
          message: cause instanceof Error ? cause.message : 'local map could not be loaded',
          source: 'local',
          operation: 'download-local-map',
        }),
    });
    if (data.isErr()) return data;
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
