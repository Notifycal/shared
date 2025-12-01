import type {
  customerPortalFlowTypeSchema,
  productRawSchema,
  tierDetailsRawSchema,
  tierMapSchema,
  topupMapSchema
} from '@schemas';
import type z from 'zod';

export const freeTrialTierId = 'good-trial' as const;
export type FreeTrialTierId = typeof freeTrialTierId;
export type TierId = keyof z.infer<typeof tierMapSchema>;
export type Tier = z.infer<typeof tierDetailsRawSchema>;
export type TierWithFreeTrial = Omit<Tier, 'id'> & { id: TierId | FreeTrialTierId };
export type TierMap = {
  [K in TierId]: Tier;
};

export type TopupId = keyof z.infer<typeof topupMapSchema>;
export type Topup = z.infer<typeof productRawSchema>;
export type TopupMap = {
  [K in TopupId]: Topup;
};

export type CustomerPortalFlowType = z.infer<typeof customerPortalFlowTypeSchema>;
