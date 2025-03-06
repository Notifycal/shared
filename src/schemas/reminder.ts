import { templateSchemaIds } from '@templates';
import { z } from 'zod';
import { calendarSchema } from './calendar';
import { contactSchema } from './common';

export const templateSchema = z.string().max(160).brand('InterpolatedTemplate');
export const templateReferenceSchema = z.union(templateSchemaIds);

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema.extend({ templateId: templateReferenceSchema })).min(1),
  business: z.object({
    name: z.string().min(1).brand('BusinessName'),
    address: z.string().min(1).brand('BusinessAddress'),
    contactDetails: contactSchema
  })
});

// This should really be defined in @types but this is an exception to resolve a circular dependency between @schemas, @templates and @types
export type ReminderConfig = z.infer<typeof reminderConfigSchema>;
