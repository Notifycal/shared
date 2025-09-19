import { Button } from '@mantine/core';
import type { LanguageCode } from '@notifycal/shared/types';
import { IconChevronUp } from '@tabler/icons-react';
import type { ReactElement } from 'react';
import { translations } from './PricingCalculator';

interface HideCalculatorButtonProps {
  lang: LanguageCode;
  onCollapse: () => void;
}

export const HideCalculatorButton = ({ lang, onCollapse }: HideCalculatorButtonProps): ReactElement => {
  const translation = translations[lang];

  return (
    <div className="mt-4 text-center">
      <Button className="text-gray-600 hover:underline" size="sm" variant="transparent" onClick={onCollapse}>
        <IconChevronUp className="mr-2" size={20} />
        <span>{translation.hideCalculator}</span>
        <IconChevronUp className="ml-2" size={20} />
      </Button>
    </div>
  );
};
