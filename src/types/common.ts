import type { z } from 'zod';

// This is useful to make the type typesafe, funnily enough.
// So that one cannot mistakenly pass in an Email instead of a UserId when both are of type string
export type Brand<T, BRAND extends string | number | symbol> = T & z.BRAND<BRAND>;

export type Jwt = Brand<string, 'Jwt'>;
export type Email = Brand<string, 'Email'>;
export type PhoneNumber = Brand<string, 'PhoneNumber'>;
export type Uuid = Brand<string, 'Uuid'>;
export type UserId = Brand<string, 'UserId'> | Uuid;
export type IdpId = Brand<string, 'IdpId'>;
export type UnixTimestamp = Brand<number, 'UnixTimestamp'>;
export type CalendarId = Brand<string, 'CalendarId'>;
export type CalendarName = Brand<string, 'CalendarName'>;
export type BusinessName = Brand<string, 'BusinessName'>;
export type BusinessAddress = Brand<string, 'BusinessAddress'>;

export type EventId = Brand<string, 'EventId'>;
export type CorrelationId = Brand<string, 'CorrelationId'>;
export type DateTime = Brand<string, 'DateTime'>;
export type TemplateId = Brand<string, 'TemplateId'>;
