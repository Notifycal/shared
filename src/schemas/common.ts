import type { DateTime, Email, IdpId, TimeZone, UnixTimestamp, UserId, Uuid } from '@types';
import { z } from 'zod';

const unsafeUuidSchema = z.string().uuid();
export const userIdSchema = unsafeUuidSchema
  .transform((data) => data as UserId)
  .or(unsafeUuidSchema.transform((data) => data as Uuid));
export const uuidSchema = unsafeUuidSchema.transform((data) => data as Uuid);
export const unixTimestampSchema = z.number().transform((data) => data as UnixTimestamp);
export const emailSchema = z
  .string()
  .email()
  .transform((data) => data as Email);
export const idpIdSchema = z
  .string()
  .max(128)
  .transform((data) => data as IdpId);
export const dateTimeSchema = z
  .string()
  .max(128)
  .datetime()
  .transform((data) => data as DateTime);
export const timeZoneSchema = z
  .string()
  .max(128)
  .transform((data) => data as TimeZone);
export const percentageSchema = z.number().min(0, 'Percentage cannot be negative');
