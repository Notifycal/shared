import type { PhoneNumber, RCSSenderId } from '@types';
import { z } from 'zod';
import { countryCodeSchema } from './i18n';

export const phoneSchema = z.object({
  type: z.literal('phone'),
  countryCode: countryCodeSchema,
  phoneNumber: z.string().transform((data) => data as PhoneNumber)
});

export const rcsSenderSchema = z.object({
  type: z.literal('rcs'),
  identifier: z.string().transform((data) => data as RCSSenderId)
});

export const senderSchema = z.discriminatedUnion('type', [rcsSenderSchema, phoneSchema]);
export const receiverSchema = z.discriminatedUnion('type', [phoneSchema]);
