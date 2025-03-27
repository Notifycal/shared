import { templateSelectionSchema } from '@templates';
import { z } from 'zod';
import { calendarSchema } from './calendar';
import { senderSchema } from './common';

export const templateSchema = z.string().max(160).brand('InterpolatedTemplate');

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema.extend({ template: templateSelectionSchema })).min(1),
  business: z.object({
    name: z.string().min(1).brand('BusinessName'),
    address: z.string().min(1).brand('BusinessAddress'),
    senderContact: senderSchema
  })
});

// This should really be defined in @types but this is an exception to resolve a circular dependency between @schemas, @templates and @types
export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
