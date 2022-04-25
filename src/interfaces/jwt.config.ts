import { Admin } from './admin';
import { User } from './user';

export interface JwtConfig {
  publicKey: string;
  handleJsonResponse?: ( code: number, message: string) => void;
}

export enum RoleType {
  USER = 'USER',
  ADMIN = 'SERVICE',
}

export interface JwtData {
  publicAddress: string,
  roleType?: RoleType,
}

export interface GenerateAuthRequest {
  signature: string;
  publicAddress: string;
  roleType?: RoleType,
}

export interface AuthResponse {
  token: string;
  user: Admin | User;
  roleType?: RoleType,
}
