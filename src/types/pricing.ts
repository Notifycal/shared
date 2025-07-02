import type { productRawSchema, tierDetailsRawSchema, tierMapSchema, topupMapSchema } from '@schemas';
import type z from 'zod';

export type TierId = keyof z.input<typeof tierMapSchema>;
export type Tier = z.infer<typeof tierDetailsRawSchema>;
export type TierMap = {
  [K in TierId]: Tier;
};

export type TopupId = keyof z.input<typeof topupMapSchema>;
export type Topup = z.infer<typeof productRawSchema>;
export type TopupMap = {
  [K in TopupId]: Topup;
};
