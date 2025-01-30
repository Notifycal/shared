import { Jwt } from '../common';

export interface AuthenticationResponse {
  accessToken: Jwt;
  tokenType: 'Bearer';
  refreshToken: Jwt;
}
