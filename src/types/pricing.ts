import type z from 'zod';
import type { tierMapSchema, tierDetailsRawSchema } from '@schemas';

export type TierId = keyof z.input<typeof tierMapSchema>;
export type Tier = z.infer<typeof tierDetailsRawSchema>;
export type TierMap = {
  [K in TierId]: Tier;
};
