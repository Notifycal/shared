import type { LanguageCode, TierId } from '@notifycal/shared/types';
import type { ReactElement } from 'react';
import { CalculatorResultDisplay, CalculatorStandbyDisplayContent } from './CalculatorResultDisplay';
import type { CalculationResult } from './calculator';

interface CalculatorResultAreaProps {
  calculationResult: CalculationResult | undefined;
  contactUrl: string;
  isSelectButtonLoading: boolean;
  minutesPerMessage: number;
  lang: LanguageCode;
  onTierSelect: (tierId: TierId) => void;
}

export const CalculatorResultArea = ({
  calculationResult,
  contactUrl,
  isSelectButtonLoading,
  minutesPerMessage,
  lang,
  onTierSelect
}: CalculatorResultAreaProps): ReactElement => (
  <div className="mt-6 p-4 border border-gray-400 rounded-lg min-h-[200px] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
    {!calculationResult ? (
      <CalculatorStandbyDisplayContent lang={lang} />
    ) : (
      <div className="w-full">
        <CalculatorResultDisplay
          contactUrl={contactUrl}
          data={calculationResult}
          isSelectButtonLoading={isSelectButtonLoading}
          lang={lang}
          layoutType="desktop"
          minutesPerMessage={minutesPerMessage}
          onTierSelect={onTierSelect}
        />
        <CalculatorResultDisplay
          contactUrl={contactUrl}
          data={calculationResult}
          isSelectButtonLoading={isSelectButtonLoading}
          lang={lang}
          layoutType="mobile"
          minutesPerMessage={minutesPerMessage}
          onTierSelect={onTierSelect}
        />
      </div>
    )}
  </div>
);
