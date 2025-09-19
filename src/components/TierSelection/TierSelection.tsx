import { TierCard, type TierInfoWithIcon } from '@notifycal/shared/components';
import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { type FC } from 'react';

interface TierRecomendation {
  tierId: TierId;
  trigger: number;
}

interface TierSelectionProps {
  orderedTierInfoWithIcons: Array<TierInfoWithIcon>;
  onTierSelection: (tierId: TierId) => Promise<void>;
  isCardButtonDisabled: (tierId: TierId) => boolean;
  isCardButtonLoading: (tierId: TierId) => boolean;
  lang: LanguageCode;
  recommendedTier: TierRecomendation | undefined;
}

export const TierSelection: FC<TierSelectionProps> = ({
  orderedTierInfoWithIcons,
  onTierSelection,
  isCardButtonDisabled,
  isCardButtonLoading,
  lang,
  recommendedTier
}: TierSelectionProps) => {
  const enhanceTierWithRecommendations = (tier: TierInfoWithIcon): TierInfoWithIcon => {
    const isDefaultRecommended = tier.id === 'better';
    const isCalculatedRecommended = recommendedTier?.tierId === tier.id;

    return {
      ...tier,
      defaultRecommended: isDefaultRecommended && !recommendedTier,
      calculatedRecommended: isCalculatedRecommended
    };
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6 lg:gap-12">
      {orderedTierInfoWithIcons.map((tier) => {
        const enhancedTier = enhanceTierWithRecommendations(tier);
        return (
          <TierCard
            key={tier.id}
            isDisabled={isCardButtonDisabled(tier.id)}
            isLoading={isCardButtonLoading(tier.id)}
            lang={lang}
            tier={enhancedTier}
            onSelect={onTierSelection}
            animationTrigger={recommendedTier?.trigger ?? 0}
          />
        );
      })}
    </div>
  );
};

export default TierSelection;
