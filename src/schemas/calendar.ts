import type { CalendarId, CalendarName } from '@types';
import { z } from 'zod';
import { dateTimeSchema, timeZoneSchema } from './common';

export const calendarSchema = z.object({
  id: z.string().transform((data) => data as CalendarId),
  name: z.string().transform((data) => data as CalendarName)
});

const attendeeSchema = z.object({
  id: z.string()
});

export const calendarEventSchema = z.object({
  id: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  startTime: dateTimeSchema,
  isAllDayEvent: z.boolean(),
  attendees: z.array(attendeeSchema),
  timeZone: timeZoneSchema
});
