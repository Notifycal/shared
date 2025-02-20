import { reminderConfigSchema } from '@schemas/reminder-template';
import { z } from 'zod';

export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
