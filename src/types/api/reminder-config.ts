import type { reminderConfigSchema } from '@schemas/reminder-template';
import type { z } from 'zod';

export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
