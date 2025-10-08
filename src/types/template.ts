import type { DateTime } from 'luxon';
import type { BusinessAddress, BusinessName, TemplateId } from './common';
import type { LanguageCode } from './i18n';

export interface Template {
  id: TemplateId;
  language: LanguageCode;
  interpolate: (
    businessName: BusinessName,
    businessAddress: BusinessAddress,
    localDateTime: DateTime,
    showTime: boolean
  ) => string;
}

export type TemplateMap = Record<TemplateId, Template>;
