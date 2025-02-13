import { z } from 'zod';
import { dateTimeSchema } from './common';

export const calendarSchema = z.object({
  id: z.string().brand('CalendarId'),
  name: z.string().brand('CalendarName')
});

const attendeeSchema = z.object({
  id: z.string()
});

export const calendarEventSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  startTime: dateTimeSchema,
  isAllDayEvent: z.boolean(),
  attendees: z.array(attendeeSchema)
});
