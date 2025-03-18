import { z } from 'zod';
import { countryCodeSchema } from './i18n';

const unsafeUuidSchema = z.string().uuid();
export const userIdSchema = unsafeUuidSchema.brand('UserId').or(unsafeUuidSchema.brand('Uuid'));
export const uuidSchema = unsafeUuidSchema.brand('Uuid');
export const unixTimestampSchema = z.number().brand('UnixTimestamp');
export const emailSchema = z.string().email().brand('Email');
export const idpIdSchema = z.string().brand('IdpId');
export const dateTimeSchema = z.string().datetime().brand('DateTime');
export const timeZoneSchema = z.string().brand('TimeZone');

export const phoneContactSchema = z.object({
  type: z.literal('phone'),
  countryCode: countryCodeSchema,
  phoneNumber: z.string().brand('PhoneNumber')
});

export const rcsContactSchema = z.object({
  type: z.literal('rcs'),
  identifier: z.string().brand('RCSSenderId')
});

export const contactSchema = z.discriminatedUnion('type', [rcsContactSchema, phoneContactSchema]);
