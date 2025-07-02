import { objectKeysToCamelCaseDeep } from '@utils';
import z from 'zod';

export const tierDetailsRawSchema = z
  .object({
    name: z.string(),
    /* eslint-disable camelcase */
    price_eur: z.number(),
    price_id: z.string(),
    product_id: z.string(),
    number_of_reminders: z.number()
    /* eslint-enable camelcase */
  })
  .transform(objectKeysToCamelCaseDeep);

export const tierMapSchema = z.object({
  good: tierDetailsRawSchema,
  better: tierDetailsRawSchema,
  best: tierDetailsRawSchema
});
