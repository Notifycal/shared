import type { calendarEventSchema, calendarSchema } from '@schemas/calendar';
import type { z } from 'zod';

export type Calendar = z.infer<typeof calendarSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;
