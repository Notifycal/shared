import { z } from 'zod';
import { countryCodeSchema } from './i18n';

export const phoneSchema = z.object({
  type: z.literal('phone'),
  countryCode: countryCodeSchema,
  phoneNumber: z.string().brand('PhoneNumber')
});

export const rcsSenderSchema = z.object({
  type: z.literal('rcs'),
  identifier: z.string().brand('RCSSenderId')
});

export const senderSchema = z.discriminatedUnion('type', [rcsSenderSchema, phoneSchema]);
