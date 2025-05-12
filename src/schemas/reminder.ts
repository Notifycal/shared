import { z } from 'zod';
import { dateTimeSchema, timeZoneSchema } from './common';

export const demoReminderPayloadSchema = z.object({
  startTime: z.object({
    dateTime: dateTimeSchema,
    timeZone: timeZoneSchema
  })
});
