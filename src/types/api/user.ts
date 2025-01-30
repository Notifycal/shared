import { Email, IdpId, UnixTimestamp, UserId } from '../common.js';

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

export interface User<TIdpName extends IdpName> extends Identity<TIdpName> {
  lastSignInAt: UnixTimestamp;
  signedUpAt: UnixTimestamp;
  userStatus: UserStatus;
}

export type UserStatus = 'banned' | 'onboarding' | 'live';
