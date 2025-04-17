import type { z } from 'zod';
import type { Email, IdpId, UnixTimestamp, UserId } from './common';
import type { reminderConfigSchema } from './reminder';

// When time comes, append IdpName with | 'idpName2'
export type IdpName = 'google.com';

export interface BaseIdentity {
  userId: UserId;
  email: Email;
}

export interface Identity<IdpName> extends BaseIdentity {
  idp: IdpName;
  idpId: IdpId;
}

export type UserStatus = 'banned' | 'onboarding' | 'live';

// This should really be defined in @schemas but this is an exception to resolve a circular dependency between @schemas, @templates and @types
export type ReminderConfig = z.infer<typeof reminderConfigSchema>;

export interface User<TIdpName extends IdpName> extends Identity<TIdpName> {
  lastSignInAt: UnixTimestamp;
  signedUpAt: UnixTimestamp;
  userStatus: UserStatus;
  config?: ReminderConfig;
}
