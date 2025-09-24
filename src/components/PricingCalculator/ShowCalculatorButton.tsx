import type { LanguageCode } from '@notifycal/shared/types';
import { IconChevronDown } from '@tabler/icons-react';
import type { ReactElement } from 'react';
import { translations } from './PricingCalculator';

interface ShowCalculatorButtonProps {
  lang: LanguageCode;
  onExpand: () => void;
}

export const ShowCalculatorButton = ({ lang, onExpand }: ShowCalculatorButtonProps): ReactElement => {
  const translation = translations[lang];

  return (
    <div className="flex justify-center py-2">
      <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={onExpand}>
        <div className="flex items-center justify-center gap-2 text-accent2-600 hover:text-accent2-800">
          <IconChevronDown size={24} />
          <span className="font-medium text-lg hover:underline">{translation.showCalculator}</span>
          <IconChevronDown size={24} />
        </div>
        <div className="text-sm text-gray-600 mt-1">{translation.showCalculatorSubtext}</div>
      </div>
    </div>
  );
};
