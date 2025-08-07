import type { PhoneNumber, RCSSenderId, SMSSenderId } from '@types';
import { z } from 'zod';
import { countryCodeSchema } from './i18n';

export const phoneSchema = z.object({
  type: z.literal('phone'),
  countryCode: countryCodeSchema,
  phoneNumber: z.string().transform((data) => data as PhoneNumber)
});
// https://developer.vonage.com/en/messaging/sms/guides/custom-sender-id#:~:text=%2B%20or%2000-,Alphanumeric,-Must%20be%20a
export const smsSenderIdSchema = z
  .string()
  .max(11)
  .regex(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ]+$/)
  .transform((data) => data as SMSSenderId);

export const smsSenderSchema = z.object({
  type: z.literal('sms'),
  identifier: smsSenderIdSchema
});

export const rcsSenderSchema = z.object({
  type: z.literal('rcs'),
  identifier: z.string().transform((data) => data as RCSSenderId)
});

export const senderSchema = z.discriminatedUnion('type', [rcsSenderSchema, smsSenderSchema]);
export const receiverSchema = z.discriminatedUnion('type', [phoneSchema]);
