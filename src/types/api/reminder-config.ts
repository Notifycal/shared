import { z } from 'zod';
import { reminderConfigSchema } from '@schemas/reminder-config';

export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
