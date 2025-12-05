import { ShieldCheckStamp } from '@components/ShieldCheckStamp/ShieldCheckStamp';
import { useTierCardAnimation } from '@components/TierCard/useTierCardAnimation';
import TierFeatures from '@components/TierFeatures/TierFeatures';
import { Badge, Button, Card } from '@mantine/core';
import { FeatureInfo } from '@pricing';
import type { TablerIcon } from '@tabler/icons-react';
import { LanguageCode, Tier, TierId } from '@types';
import clsx from 'clsx';
import { FC } from 'react';
import caTranslations from './i18n/ca.json' with { type: 'json' };
import enTranslations from './i18n/en.json' with { type: 'json' };
import esTranslations from './i18n/es.json' with { type: 'json' };

export interface TierInfo extends Tier {
  id: TierId;
  displayName: string;
  defaultRecommended?: boolean;
  calculatedRecommended?: boolean;
  features: Array<FeatureInfo>;
}

export type TierInfoWithIcon = TierInfo & { icon: TablerIcon };

interface TierCardProps {
  tier: TierInfoWithIcon;
  isLoading: boolean;
  isDisabled: boolean;
  onSelect: (tierId: TierId | 'good-trial') => void;
  lang: LanguageCode;
  animationTrigger: number;
  showFreeTrial: boolean;
}

const translations: Record<LanguageCode, typeof esTranslations> = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

const calculateOriginalPrice = (discountedPrice: number): number => {
  return Math.round(discountedPrice * 1.5);
};

export const TierCard: FC<TierCardProps> = ({
  tier,
  isLoading,
  isDisabled,
  onSelect,
  lang,
  animationTrigger,
  showFreeTrial
}) => {
  const translation = translations[lang];
  const hasRecommendation = tier.calculatedRecommended || tier.defaultRecommended || false;
  const badgeText = tier.calculatedRecommended ? translation.calculatedRecommendedBadge : translation.popularBadge;

  const { animationClasses } = useTierCardAnimation(
    tier.calculatedRecommended || false,
    animationTrigger,
    hasRecommendation
  );

  return (
    <div key={tier.displayName}>
      {hasRecommendation && (
        <div className="relative sm:mx-5 lg:mx-15">
          <Badge
            fullWidth
            className="absolute left-1/2 -translate-x-1/2 -top-5 z-10"
            color="accent1"
            radius="sm"
            size="lg"
            variant="filled"
          >
            {badgeText}
          </Badge>
        </div>
      )}
      <Card
        withBorder
        padding="lg"
        radius="md"
        shadow="md"
        className={clsx(
          'h-full flex flex-col justify-between shadow-lg font-bold',
          hasRecommendation
            ? 'hover:scale-[1.07] bg-accent2-700 text-white shadow-xl hover:shadow-2xl'
            : 'hover:scale-[1.02] bg-white text-accent2-900',
          animationClasses
        )}
      >
        <div className="space-y-2">
          <div className="text-xl">{tier.displayName}</div>
          <div className="text-sm opacity-80 min-h-[3.5rem] flex items-start justify-start">
            {translation.tierDescriptions[tier.id]}
          </div>

          <div className="flex justify-start items-baseline gap-2">
            <div className={clsx('text-lg line-through', hasRecommendation ? 'opacity-70' : 'opacity-60')}>
              {calculateOriginalPrice(tier.priceEur)}€
            </div>
            <div className="text-4xl font-bold">{tier.priceEur}€</div>
            <div className="text-sm opacity-80">/{translation.month}</div>
          </div>
          {showFreeTrial ? (
            <div className="space-y-2 mt-sm">
              <Button
                fullWidth
                color="accent2"
                disabled={isDisabled}
                loading={isLoading}
                size="md"
                variant="outline"
                onClick={() => {
                  onSelect(tier.id);
                }}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {translation.selectButton}
              </Button>
              <Button
                fullWidth
                color="primary"
                disabled={isDisabled}
                loading={isLoading}
                size="md"
                variant="filled"
                onClick={() => {
                  onSelect((tier.id + '-trial') as TierId);
                }}
                className="hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                {translation.freeTrialButton}
              </Button>
            </div>
          ) : (
            <Button
              fullWidth
              color={hasRecommendation ? 'primary' : 'accent2'}
              disabled={isDisabled}
              loading={isLoading}
              mt="sm"
              variant={hasRecommendation ? 'filled' : 'outline'}
              onClick={() => {
                onSelect(tier.id);
              }}
            >
              {translation.selectButton}
            </Button>
          )}
          <TierFeatures className="min-h-[8rem] mb-4" tier={tier} />
        </div>
      </Card>
      <ShieldCheckStamp text={translation.cancelAnytime} recommended={hasRecommendation || false} />
    </div>
  );
};
