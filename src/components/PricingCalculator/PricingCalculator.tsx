import { Card, Group } from '@mantine/core';
import type { TierInfoWithIcon } from '@notifycal/shared/components';
import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { IconCalculator } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import { calculateTierRecommendation, type CalculationResult } from './calculator';
import { Form } from './Form';
import { HideCalculatorButton } from './HideCalculatorButton';
import caTranslations from './i18n/ca.json' with { type: 'json' };
import enTranslations from './i18n/en.json' with { type: 'json' };
import esTranslations from './i18n/es.json' with { type: 'json' };
import { CalculatorResultContainer } from './ResultContainer';
import { ShowCalculatorButton } from './ShowCalculatorButton';

interface PricingCalculatorProps {
  orderedTierInfoWithIcons: Array<TierInfoWithIcon>;
  onTierRecommendation: (data: { tierId: TierId; trigger: number }) => void;
  onTierSelect: (tierId: TierId) => void;
  isSelectButtonLoading: boolean;
  contactUrl: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  lang: LanguageCode;
}

export const translations: Record<LanguageCode, typeof esTranslations> = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

export const PricingCalculator: FC<PricingCalculatorProps> = ({
  orderedTierInfoWithIcons,
  onTierRecommendation,
  onTierSelect,
  isSelectButtonLoading,
  contactUrl,
  collapsible = false,
  defaultExpanded = false,
  lang
}) => {
  const translation = translations[lang];
  const [employees, setEmployees] = useState<number>(1);
  const [avgTimeWithClient, setAvgTimeWithClient] = useState<string>('60');
  const [workingHoursPerDay, setWorkingHoursPerDay] = useState<string>('8');
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<number>(22);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState<boolean>(collapsible ? defaultExpanded : true);

  const minutesPerMessage = 5;
  const handleCalculate = (): void => {
    const result = calculateTierRecommendation({
      employees,
      avgTimeWithClient,
      workingHoursPerDay,
      workingDaysPerMonth,
      minutesPerMessage,
      orderedTierInfoWithIcons
    });
    setCalculationResult(result);
    onTierRecommendation({
      tierId: result.recommendedTier.id,
      trigger: Date.now()
    });
  };

  if (collapsible && !isExpanded) {
    return (
      <ShowCalculatorButton
        lang={lang}
        onExpand={() => {
          setIsExpanded(true);
        }}
      />
    );
  }

  return (
    <Card withBorder className="bg-white max-w-4xl mx-auto" padding="lg" radius="md" shadow="md">
      <Group gap="xs" justify="center" mb="md">
        <IconCalculator className="text-accent2-600 mb-2" size={30} />
        <h4 className="font-semibold">{translation.title}</h4>
      </Group>

      <Form
        avgTimeWithClient={avgTimeWithClient}
        employees={employees}
        workingDaysPerMonth={workingDaysPerMonth}
        workingHoursPerDay={workingHoursPerDay}
        lang={lang}
        onAvgTimeWithClientChange={setAvgTimeWithClient}
        onCalculate={handleCalculate}
        onEmployeesChange={setEmployees}
        onWorkingDaysPerMonthChange={setWorkingDaysPerMonth}
        onWorkingHoursPerDayChange={setWorkingHoursPerDay}
      />

      <CalculatorResultContainer
        calculationResult={calculationResult}
        contactUrl={contactUrl}
        isSelectButtonLoading={isSelectButtonLoading}
        lang={lang}
        minutesPerMessage={minutesPerMessage}
        onTierSelect={onTierSelect}
      />

      {collapsible && (
        <HideCalculatorButton
          lang={lang}
          onCollapse={() => {
            setIsExpanded(false);
          }}
        />
      )}
    </Card>
  );
};
