import type { z } from 'zod';
import type { Email, IdpId, StripeCustomerId, UnixTimestamp, UserId } from './common';
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

export type UserStatus = 'banned' | 'onboarding' | 'demo' | 'live' | 'out-of-credits';

// This should really be defined in @schemas but this is an exception to resolve a circular dependency between @schemas, @templates and @types
export type ReminderConfig = z.input<typeof reminderConfigSchema>;
export type ReminderConfigTransformed = z.output<typeof reminderConfigSchema>;

export interface User<TIdpName extends IdpName> extends Identity<TIdpName> {
  lastSignInAt: UnixTimestamp;
  signedUpAt: UnixTimestamp;
  userStatus: UserStatus;
  stripeCustomerId?: StripeCustomerId;
  config?: ReminderConfigTransformed;
}
