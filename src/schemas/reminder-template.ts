import { z, ZodLiteral } from 'zod';

import { templateMap } from '@templates';
import { TemplateId } from '@types';
import { calendarSchema } from './calendar';
import { contactSchema } from './common';

export const templateSchema = z.string().max(160).brand('InterpolatedTemplate');
const templateSchemaIds = Object.values(templateMap)
  .concat(Object.values(templateMap))
  .map((t) => z.literal(t.id)) as unknown as Readonly<
  [ZodLiteral<TemplateId>, ZodLiteral<TemplateId>, ...ZodLiteral<TemplateId>[]]
>;
export const templateReferenceSchema = z.union(templateSchemaIds);

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema.extend({ templateId: templateReferenceSchema })).min(1),
  business: z.object({
    name: z.string().min(1).brand('BusinessName'),
    address: z.string().min(1).brand('BusinessAddress'),
    contactDetails: contactSchema
  })
});
