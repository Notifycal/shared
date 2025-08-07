import { z } from 'zod';
import { dateTimeSchema, timeZoneSchema } from './common';
import { phoneSchema } from './contact';

export const demoReminderPayloadSchema = z.object({
  startTime: z.object({
    dateTime: dateTimeSchema,
    timeZone: timeZoneSchema
  }),
  receiverContact: phoneSchema
});
