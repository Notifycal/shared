import { z } from 'zod';
import { dateTimeSchema, timeZoneSchema } from './common';
import { receiverSchema } from './contact';

export const demoReminderPayloadSchema = z.object({
  receiverContact: receiverSchema,
  startTime: z.object({
    dateTime: dateTimeSchema,
    timeZone: timeZoneSchema
  })
});
