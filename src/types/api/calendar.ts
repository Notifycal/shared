import { calendarEventSchema, calendarSchema } from '@schemas/calendar';
import { z } from 'zod';

export type Calendar = z.infer<typeof calendarSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;
