import { Button, NumberInput, Select } from '@mantine/core';
import type { LanguageCode } from '@notifycal/shared/types';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import { getTimeOptions, getWorkingHoursOptions } from './calculator';
import { translations } from './PricingCalculator';

interface FormProps {
  employees: number;
  avgTimeWithClient: string;
  workingHoursPerDay: string;
  workingDaysPerMonth: number;
  lang: LanguageCode;
  onEmployeesChange: (value: number) => void;
  onAvgTimeWithClientChange: (value: string) => void;
  onWorkingHoursPerDayChange: (value: string) => void;
  onWorkingDaysPerMonthChange: (value: number) => void;
  onCalculate: (shouldClear?: boolean) => void;
}

export const Form = ({
  employees,
  avgTimeWithClient,
  workingHoursPerDay,
  workingDaysPerMonth,
  lang,
  onEmployeesChange,
  onAvgTimeWithClientChange,
  onWorkingHoursPerDayChange,
  onWorkingDaysPerMonthChange,
  onCalculate
}: FormProps): ReactElement => {
  const translation = translations[lang];
  const timeOptions = getTimeOptions(translation.units);
  const workingHoursOptions = getWorkingHoursOptions(translation.units);

  const isFormValid = employees > 0 && workingDaysPerMonth > 0;
  const wasValidRef = useRef(isFormValid);

  useEffect(() => {
    if (wasValidRef.current && !isFormValid) {
      onCalculate(true);
    }
    wasValidRef.current = isFormValid;
  }, [isFormValid, onCalculate]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <NumberInput
        className="w-full md:order-1"
        label={translation.employees}
        max={100}
        min={0}
        value={employees}
        onChange={(value) => {
          onEmployeesChange(Number(value) || 0);
        }}
      />
      <Select
        className="w-full md:order-2"
        data={timeOptions}
        label={translation.timeWithClient}
        value={avgTimeWithClient}
        onChange={(value) => {
          onAvgTimeWithClientChange(value || '60');
        }}
      />
      <Select
        className="w-full md:order-4"
        data={workingHoursOptions}
        label={translation.workingHours}
        value={workingHoursPerDay}
        onChange={(value) => {
          onWorkingHoursPerDayChange(value || '8');
        }}
      />
      <NumberInput
        className="w-full md:order-5"
        label={translation.workingDays}
        max={31}
        min={0}
        value={workingDaysPerMonth}
        onChange={(value) => {
          onWorkingDaysPerMonthChange(Number(value) || 0);
        }}
      />
      <div className="md:order-3 md:row-span-2 flex items-center md:py-1 md:pt-6 md:pl-4">
        <Button
          className="w-full h-full md:min-h-[90px] text-sm font-bold py-4 md:py-0"
          color="accent2"
          size="lg"
          variant="outline"
          disabled={!isFormValid}
          onClick={() => onCalculate()}
        >
          {translation.calculate}
        </Button>
      </div>
    </form>
  );
};
