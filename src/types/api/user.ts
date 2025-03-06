import type { Email, IdpId, UnixTimestamp, UserId } from '../common';

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

export interface User<TIdpName extends IdpName> extends Identity<TIdpName> {
  lastSignInAt: UnixTimestamp;
  signedUpAt: UnixTimestamp;
  userStatus: UserStatus;
}
