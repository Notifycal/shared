import type { TierInfoWithIcon } from '@notifycal/shared/components';
import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { IconAward, IconMedal, IconTrophy } from '@tabler/icons-react';

import caTranslations from './i18n/ca.json' with { type: 'json' };
import enTranslations from './i18n/en.json' with { type: 'json' };
import esTranslations from './i18n/es.json' with { type: 'json' };

type CommonFeatures =
  | 'numberOfMonthlyReminders'
  | 'lowCreditsAlert'
  | 'insufficientCreditsAlert'
  | 'topupsAvailable'
  | 'unlimitedCalendarIntegration'
  | 'reminderTypeSelection';
type ByTierFeatures = 'supportLevel';

export interface FeatureInfo {
  text: string;
  moreInfo?: string | undefined;
}

interface TranslationKeys {
  common: Record<CommonFeatures, FeatureInfo>;
  byTier: Record<ByTierFeatures, Record<TierId, FeatureInfo>>;
  exclusive: {
    good: Record<string, never>;
    better: Record<string, never>;
    best: Record<string, never>;
  };
}

const translations: Record<LanguageCode, TranslationKeys> = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

import { countryCodeSchema, stringifiedSchema, tierMapSchema, topupMapSchema } from '@notifycal/shared/schemas';

import z from 'zod';

const pricingConfigSchema = z.object({
  tiers: tierMapSchema,
  topups: topupMapSchema
});

export const productsInfoSchema = stringifiedSchema(pricingConfigSchema, 'Invalid tier info object');
export type ProductsInfo = z.infer<typeof productsInfoSchema>;

export const countryToSmsCostMapSchema = z.record(countryCodeSchema.exclude(['GB']), z.number());
export const countryToSmsCostMapStringifiedSchema = stringifiedSchema(
  countryToSmsCostMapSchema,
  'Invalid country to sms cost map'
);

export type CountryToSmsCostMap = z.infer<typeof countryToSmsCostMapSchema>;

const tierFeatures = (lang: LanguageCode, tierId: TierId, tierNumberOfReminders: number): Array<FeatureInfo> => {
  const t = translations[lang];
  const numberOfRemindersFeature = t.common.numberOfMonthlyReminders;

  const processedNumberOfReminders: FeatureInfo = {
    text: `${tierNumberOfReminders.toLocaleString(lang)} ${numberOfRemindersFeature.text}`,
    moreInfo: numberOfRemindersFeature.moreInfo
  };

  const _common: Record<CommonFeatures, FeatureInfo> = {
    ...t.common,
    numberOfMonthlyReminders: processedNumberOfReminders
  };
  const common = Object.values(_common);
  const byTier = Object.values(t.byTier).map((featureByTier) => featureByTier[tierId]);
  const exclusive = Object.values(t.exclusive[tierId]);
  return [...common, ...byTier, ...exclusive];
};

const tierExtraInfo = {
  good: {
    recommended: false,
    displayName: 'Solo',
    icon: IconMedal
  },
  better: {
    recommended: true,
    displayName: 'Team',
    icon: IconTrophy
  },
  best: {
    recommended: false,
    displayName: 'Pro',
    icon: IconAward
  }
};
function extendTierInfo(tierId: TierId, tiersInfo: ProductsInfo['tiers'], lang: LanguageCode): TierInfoWithIcon {
  return {
    ...tiersInfo[tierId],
    ...tierExtraInfo[tierId],
    features: tierFeatures(lang, tierId, tiersInfo[tierId].numberOfReminders),
    id: tierId
  };
}

type ExpectedTierOrder = readonly ['good', 'better', 'best'];
const tierOrder: ExpectedTierOrder = ['good', 'better', 'best'] as const satisfies ReadonlyArray<TierId>;

export function orderedTierInfoWithIcons(tiers: ProductsInfo['tiers'], lang: LanguageCode): Array<TierInfoWithIcon> {
  return tierOrder.map((tierId) => extendTierInfo(tierId, tiers, lang));
}
