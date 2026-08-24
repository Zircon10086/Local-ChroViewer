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
 */

export interface LocalMapResolveOptions {
  onProgress?: (progress: number | null) => void;
  request?: FetchRequest;
  signal?: AbortSignal;
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

  const data = await Result.tryPromise({
    try: () => requestArrayBuffer(`/api/maps/${normalized}/package`, {
      source: 'local',
      label: `Local map ${normalized}`,
      operation: 'download-local-map',
      onProgress: options.onProgress,
      request: options.request,
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
}
