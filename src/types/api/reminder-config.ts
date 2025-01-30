import { z } from 'zod';
import { calendarSchema } from './calendar.js';

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema).min(1),
  businessName: z.string().min(1).brand('BusinessName'),
  businessAddress: z.string().min(1).brand('BusinessAddress')
});
export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
