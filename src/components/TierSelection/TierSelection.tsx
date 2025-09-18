import { type TierInfoWithIcon, TierCard } from '@notifycal/shared/components';
import { IconShieldCheck } from '@tabler/icons-react';
import { LanguageCode, TierId } from '@types';
import type { FC } from 'react';
import caTranslations from './i18n/ca.json' with { type: 'json' };
import enTranslations from './i18n/en.json' with { type: 'json' };
import esTranslations from './i18n/es.json' with { type: 'json' };

interface TierSelectionProps {
  displayNavigationButtons?: boolean;
  orderedTierInfoWithIcons: Array<TierInfoWithIcon>;
  onTierSelection: (tierId: TierId) => Promise<void>;
  isCardButtonDisabled: (tierId: TierId) => boolean;
  isCardButtonLoading: (tierId: TierId) => boolean;
  lang: LanguageCode;
}

const translations = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

export const TierSelection: FC<TierSelectionProps> = ({
  orderedTierInfoWithIcons,
  onTierSelection,
  isCardButtonDisabled,
  isCardButtonLoading,
  lang
}: TierSelectionProps) => {
  const translation = translations[lang];
  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6 lg:gap-12">
        {orderedTierInfoWithIcons.map((tier) => {
          return (
            <TierCard
              key={tier.id}
              isDisabled={isCardButtonDisabled(tier.id)}
              isLoading={isCardButtonLoading(tier.id)}
              lang={lang}
              tier={tier}
              onSelect={onTierSelection}
            />
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-3 text-gray-600">
          <IconShieldCheck className="text-primary-600" size={24} />
          <span className="text-base font-medium">{translation.confidenceBooster}</span>
        </div>
      </div>
    </>
  );
};
