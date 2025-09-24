import type { TierInfoWithIcon } from '@notifycal/shared/components';

export interface CalculationResult {
  monthlyMessages: number;
  recommendedTier: TierInfoWithIcon;
  exceedsTopTier: boolean;
  savedHours: number;
}

interface TimeOption {
  value: string;
  label: string;
}

const formatTimeLabel = (minutes: number, translations: { min: string; hour: string; hours: string }): string => {
  if (minutes < 60) {
    return `${minutes} ${translations.min}`;
  }
  const hours = minutes / 60;
  const unitKey = hours === 1 ? 'hour' : 'hours';
  return hours % 1 === 0 ? `${hours} ${translations[unitKey]}` : `${hours} ${translations[unitKey]}`;
};

export const getTimeOptions = (translations: { min: string; hour: string; hours: string }): Array<TimeOption> => {
  const timeValues = [10, 15, 20, 30, 45, 60, 75, 90, 105, 120, 150, 180, 240, 300, 360, 480];

  return timeValues.map((minutes) => ({
    value: minutes.toString(),
    label: formatTimeLabel(minutes, translations)
  }));
};

export const getWorkingHoursOptions = (translations: { hour: string; hours: string }): Array<TimeOption> => {
  const hourValues = [4, 5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10, 12];

  return hourValues.map((hours) => ({
    value: hours.toString(),
    label: `${hours} ${hours === 1 ? translations.hour : translations.hours}`
  }));
};

interface CalculationParameters {
  employees: number;
  avgTimeWithClient: string;
  workingHoursPerDay: string;
  workingDaysPerMonth: number;
  minutesPerMessage: number;
  orderedTierInfoWithIcons: Array<TierInfoWithIcon>;
}

export const calculateTierRecommendation = (parameters: CalculationParameters): CalculationResult => {
  const {
    employees,
    avgTimeWithClient,
    workingHoursPerDay,
    workingDaysPerMonth,
    minutesPerMessage,
    orderedTierInfoWithIcons
  } = parameters;

  const avgTimeInHours = Number(avgTimeWithClient) / 60;
  const hoursPerDay = Number(workingHoursPerDay);
  const appointmentsPerEmployeePerDay = hoursPerDay / avgTimeInHours;
  const totalAppointmentsPerDay = appointmentsPerEmployeePerDay * employees;
  const monthlyMessages = Math.ceil(totalAppointmentsPerDay * workingDaysPerMonth);

  const totalMinutesSaved = monthlyMessages * minutesPerMessage;
  const savedHours = Math.round((totalMinutesSaved / 60) * 10) / 10;

  const sortedTiers = [...orderedTierInfoWithIcons].sort((a, b) => a.numberOfReminders - b.numberOfReminders);
  const topTier = sortedTiers[sortedTiers.length - 1];
  const maxTierLimit = topTier?.numberOfReminders || 0;

  const exceedsTopTier = monthlyMessages > maxTierLimit;
  const recommendedTier = sortedTiers.find((tier) => monthlyMessages <= tier.numberOfReminders) ?? topTier!;

  return {
    monthlyMessages,
    recommendedTier,
    exceedsTopTier,
    savedHours
  };
};
