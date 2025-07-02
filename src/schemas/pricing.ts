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
export const productRawSchema = tierDetailsRawSchema;

export const tierMapSchema = z.object({
  good: tierDetailsRawSchema,
  better: tierDetailsRawSchema,
  best: tierDetailsRawSchema
});
export const tierIds = Object.keys(tierMapSchema.shape) as Array<keyof z.infer<typeof tierMapSchema>>;

export const topupMapSchema = z.object({
  single: productRawSchema
});
export const topupIds = Object.keys(topupMapSchema.shape) as Array<keyof z.infer<typeof topupMapSchema>>;
