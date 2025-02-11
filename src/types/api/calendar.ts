import { z } from 'zod';
import { calendarSchema } from '@schemas/calendar';

export type Calendar = z.infer<typeof calendarSchema>;
