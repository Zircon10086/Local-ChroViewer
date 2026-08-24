import { z } from 'zod';

import { configurableViewerSources } from './source-types';

export const enabledViewerSourcesSchema = z
  .string()
  .default(configurableViewerSources.join(','))
  .transform((value) => value.split(',').map((source) => source.trim()))
  .pipe(z.array(z.enum(configurableViewerSources)).min(1));
