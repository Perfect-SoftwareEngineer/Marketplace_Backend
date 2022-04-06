import { Request } from 'express';
import { RoleType } from './jwt.config';

export interface IExpressRequest extends Request {
  publicAddress?: string;
  roleType: RoleType,
  token?: string;
}
