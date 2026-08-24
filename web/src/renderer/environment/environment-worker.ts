import { Result } from 'better-result';
import { z } from 'zod';

import type { EnvironmentWorkerRequest, EnvironmentWorkerResponse } from './environment-worker-protocol';
import type { EnvironmentData } from './types';

const environmentDataSchema = z.custom<EnvironmentData>(
  (value) => z.looseObject({ version: z.literal(1), id: z.string() }).safeParse(value).success,
);

async function loadEnvironmentData({ id, url }: EnvironmentWorkerRequest) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`environment ${id} failed to load (${response.status})`);
  const data = environmentDataSchema.parse(await response.json());
  if (data.id !== id) throw new Error(`environment ${id} has invalid metadata`);
  return data;
}

self.addEventListener('message', (event: MessageEvent<EnvironmentWorkerRequest>) => {
  void Result.tryPromise(() => loadEnvironmentData(event.data)).then((result) => {
    const response: EnvironmentWorkerResponse = result.isOk()
      ? { ok: true, data: result.value }
      : { ok: false, error: result.error instanceof Error ? result.error.message : String(result.error) };
    self.postMessage(response);
  });
});
