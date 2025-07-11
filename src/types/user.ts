import type { z } from 'zod';
import type { Email, IdpId, StripeCustomerId, UnixTimestamp, UserId } from './common';
import type { TierId } from './pricing';
import type { reminderConfigSchema } from './reminder';

// When time comes, append IdpName with | 'idpName2'
export type IdpName = 'google.com';

export interface BaseUserIdentity {
  userId: UserId;
  email: Email;
}

export interface UserIdentity<IdpName> extends BaseUserIdentity {
  idp: IdpName;
  idpId: IdpId;
}

export type UserStatus = 'banned' | 'onboarding' | 'demo' | 'live' | 'out-of-credits' | 'unpaid' | 'cancelled';

// This should really be defined in @schemas but this is an exception to resolve a circular dependency between @schemas, @templates and @types
export type ReminderConfig = z.input<typeof reminderConfigSchema>;
export type ReminderConfigTransformed = z.output<typeof reminderConfigSchema>;

export interface UserCredits {
  subscriptionCreditBalance: number;
  tier: TierId;
  topupCreditBalance: number;
}

export interface User<TIdpName extends IdpName> extends UserIdentity<TIdpName> {
  lastSignInAt: UnixTimestamp;
  signedUpAt: UnixTimestamp;
  userStatus: UserStatus;
  stripeCustomerId?: StripeCustomerId;
  config?: ReminderConfigTransformed;
  credits?: UserCredits;
  demoReminderCount?: number;
}
