import { Result } from 'better-result';
import { z } from 'zod';

import { env } from '../env';
import { requestJson } from '../sources/http';
import type { ScoreControllerGetScoreData } from '../sources/scoresaber/generated/api-contracts';
import type { SourceResult } from '../sources/source-types';

export interface ReplayPreviewScore {
  leaderboard: {
    difficulty: Pick<ScoreControllerGetScoreData['leaderboard']['difficulty'], 'difficulty'>;
    map: Pick<
      ScoreControllerGetScoreData['leaderboard']['map'],
      'coverUrl' | 'levelAuthorName' | 'songAuthorName' | 'songName' | 'songSubName'
    >;
    realm: Pick<ScoreControllerGetScoreData['leaderboard']['realm'], 'stars'>;
  };
  score: Pick<
    ScoreControllerGetScoreData['score'],
    'accuracy' | 'badCuts' | 'fullCombo' | 'missedNotes' | 'modifiedScore' | 'pp' | 'rank'
  > & {
    player: Pick<ScoreControllerGetScoreData['score']['player'], 'avatar' | 'country' | 'id' | 'name'>;
  };
}

const replayPreviewScoreSchema: z.ZodType<ReplayPreviewScore> = z.object({
  leaderboard: z.object({
    difficulty: z.object({ difficulty: z.int() }),
    map: z.object({
      coverUrl: z.string(),
      levelAuthorName: z.string(),
      songAuthorName: z.string(),
      songName: z.string(),
      songSubName: z.string(),
    }),
    realm: z.object({ stars: z.number() }),
  }),
  score: z.object({
    accuracy: z.number(),
    badCuts: z.int().nonnegative(),
    fullCombo: z.boolean(),
    missedNotes: z.int().nonnegative(),
    modifiedScore: z.int(),
    pp: z.number(),
    rank: z.int(),
    player: z.object({
      avatar: z.string(),
      country: z.string(),
      id: z.string().min(1),
      name: z.string(),
    }),
  }),
});

const scoreCacheTtlMs = 5 * 60 * 1000;
const scoreCacheLimit = 128;
const scoreTimeoutMs = 4_000;

interface ScoreCacheEntry {
  expires: number;
  score: ReplayPreviewScore;
}

const scoreCache = new Map<string, ScoreCacheEntry>();
const scoreRequests = new Map<string, Promise<SourceResult<ReplayPreviewScore>>>();

export function fetchReplayPreviewScore(scoreId: string): Promise<SourceResult<ReplayPreviewScore>> {
  const cached = scoreCache.get(scoreId);
  if (cached !== undefined && cached.expires >= Date.now()) {
    scoreCache.delete(scoreId);
    scoreCache.set(scoreId, cached);
    return Promise.resolve(Result.ok(cached.score));
  }
  if (cached !== undefined) scoreCache.delete(scoreId);

  const pending = scoreRequests.get(scoreId);
  if (pending !== undefined) return pending;

  const request = requestJson(
    `${env.VITE_SCORESABER_API_URL}/api/v2/scores/${scoreId}?includeScoreStats=false`,
    replayPreviewScoreSchema,
    {
      source: 'scoresaber',
      label: `ScoreSaber score ${scoreId}`,
      operation: 'load-score-preview',
      signal: AbortSignal.timeout(scoreTimeoutMs),
    },
  );
  scoreRequests.set(scoreId, request);
  void request.then(
    (result) => {
      scoreRequests.delete(scoreId);
      if (result.isErr()) return;
      scoreCache.delete(scoreId);
      scoreCache.set(scoreId, { expires: Date.now() + scoreCacheTtlMs, score: result.value });
      for (const oldest of scoreCache.keys()) {
        if (scoreCache.size <= scoreCacheLimit) break;
        scoreCache.delete(oldest);
      }
    },
    () => {
      scoreRequests.delete(scoreId);
    },
  );
  return request;
}
