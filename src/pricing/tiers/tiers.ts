import type { TierInfoWithIcon } from '@notifycal/shared/components';
import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { IconAward, IconMedal, IconTrophy } from '@tabler/icons-react';

import caTranslations from './i18n/ca.json' with { type: 'json' };
import enTranslations from './i18n/en.json' with { type: 'json' };
import esTranslations from './i18n/es.json' with { type: 'json' };

type CommonFeatures = 'numberOfMonthlyReminders' | 'googleCalendarIntegration';
type ByTierFeatures = 'supportLevel' | 'responseTime' | 'integrationLimit';
type ExclusiveBetterFeatures = 'advancedReports' | 'customBranding';
type ExclusiveBestFeatures = 'advancedReports' | 'customBranding';

interface TranslationKeys {
  common: Record<CommonFeatures, string>;
  byTier: Record<ByTierFeatures, Record<TierId, string>>;
  exclusive: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    good: {};
    better: Record<ExclusiveBetterFeatures, string>;
    best: Record<ExclusiveBestFeatures, string>;
  };
}

const translations: Record<LanguageCode, TranslationKeys> = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

import { tierMapSchema, topupMapSchema } from '@notifycal/shared/schemas';

import z from 'zod';

const pricingConfigSchema = z.object({
  tiers: tierMapSchema,
  topups: topupMapSchema
});

export const productsInfoSchema = z.string().transform((data, context) => {
  try {
    const jsonParsed = JSON.parse(data) as object;
    return pricingConfigSchema.parse(jsonParsed);
  } catch {
    context.addIssue({ code: 'custom', message: 'Invalid tier info object' });
    return z.NEVER;
  }
});
export type ProductsInfo = z.infer<typeof productsInfoSchema>;

const tierFeatures = (lang: LanguageCode, tierId: TierId, tierNumberOfReminders: number): Array<string> => {
  const t = translations[lang];
  const _common: Record<CommonFeatures, string> = {
    ...t.common,
    numberOfMonthlyReminders: `${tierNumberOfReminders.toLocaleString(lang)} ${t.common.numberOfMonthlyReminders}`
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
