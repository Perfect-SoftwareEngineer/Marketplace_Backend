import { KnexHelper } from '../helpers/knex.helper';
import { SignatureVerifier } from '../helpers/signature.verifier';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';
import { User } from '../interfaces/user';
import { AuthResponse, GenerateAuthRequest, JwtData, RoleType } from '../interfaces/jwt.config';
import { Admin } from '../interfaces/admin';
import * as adminService from '../services/admin.service';
import * as userService from '../services/user.service';
import { JwtHelper } from '../helpers/jwt.helper';
import { JWT_PUBLIC_KEY } from '../constants';

export async function generateAuthToken(request: GenerateAuthRequest): Promise<AuthResponse> {
  const { publicAddress, signature, roleType } = request;
  let user: Admin | User;
  if (roleType === RoleType.ADMIN) {
    user = (await adminService.getAdmins({ public_address: publicAddress }))[0];
  } else {
    user = (await userService.getUsers({ public_address: publicAddress }))[0];
  }
  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
  }

  await SignatureVerifier.verifySignature({ publicAddress, signature, user });
  const jwtHelper = new JwtHelper({ publicKey: JWT_PUBLIC_KEY });
  const token = await jwtHelper.generateToken({ publicAddress, roleType });

  // Update Nonce
  if (roleType === RoleType.ADMIN) {
    await KnexHelper.updateAdmin(publicAddress, { nonce: Math.floor(Math.random() * 1000000) })
  } else {
    await KnexHelper.updateUser(publicAddress, { nonce: Math.floor(Math.random() * 1000000) })
  }
  return { token, user };

}
