import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { IconCalculator } from '@tabler/icons-react';
import type { ReactElement } from 'react';
import type { CalculationResult } from './calculator';
import { translations } from './PricingCalculator';
import { Action, Arrow, MonthlyEstimateAndMetrics } from './ResultDisplayComponents';

interface StandbyDisplayContentProps {
  lang: LanguageCode;
}

export const StandbyDisplayContent = ({ lang }: StandbyDisplayContentProps): ReactElement => {
  const translation = translations[lang];

  return (
    <div className="text-gray-500 py-2 text-center">
      <IconCalculator className="mx-auto mb-1 opacity-50" size={24} />
      <p className="text-xs">{translation.standbyMessage}</p>
    </div>
  );
};

interface ResultDisplayProps {
  data: CalculationResult;
  minutesPerMessage: number;
  isSelectButtonLoading: boolean;
  contactUrl: string;
  lang: LanguageCode;
  onTierSelect: (tierId: TierId) => void;
}

export const ResultDisplay = ({
  data,
  minutesPerMessage,
  isSelectButtonLoading,
  contactUrl,
  lang,
  onTierSelect
}: ResultDisplayProps): ReactElement => {
  const translation = translations[lang];

  const { monthlyMessages, recommendedTier, exceedsTopTier, savedHours } = data;
  const estimateAndMetrics = MonthlyEstimateAndMetrics(
    monthlyMessages,
    savedHours,
    minutesPerMessage,
    exceedsTopTier,
    translation
  );
  const actionButton = (
    <Action
      contactUrl={contactUrl}
      isSelectButtonLoading={isSelectButtonLoading}
      tier={recommendedTier ?? undefined}
      type={exceedsTopTier ? 'contact' : 'tier'}
      lang={lang}
      onTierSelect={onTierSelect}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:gap-6">
      {estimateAndMetrics}
      <div className="md:hidden">{Arrow('vertical')}</div>
      <div className="hidden md:block">{Arrow('horizontal')}</div>
      {actionButton}
    </div>
  );
};
