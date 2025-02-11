import { z } from 'zod';

const unsafeUuidSchema = z.string().uuid();
export const userIdSchema = unsafeUuidSchema.brand('UserId').or(unsafeUuidSchema.brand('Uuid'));
export const uuidSchema = unsafeUuidSchema.brand('Uuid');
export const unixTimestampSchema = z.number().brand('UnixTimestamp');
export const emailSchema = z.string().email().brand('Email');
export const idpIdSchema = z.string().brand('IdpId');
