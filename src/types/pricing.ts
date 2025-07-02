import type z from 'zod';
import type { tierInfoInnerSchema, tierDetailsRawSchema } from '@schemas';

export type TierId = keyof z.input<typeof tierInfoInnerSchema>;
export type TierDetails = z.infer<typeof tierDetailsRawSchema>;
export type TierInfoMap = {
  [K in TierId]: TierDetails;
};
