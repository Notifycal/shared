import type { DateTime } from 'luxon';
import type { BusinessAddress, BusinessName, TemplateId } from './common';

export interface Template {
  id: TemplateId;
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => string;
}

export type TemplateMap = { [key: string]: Template };
