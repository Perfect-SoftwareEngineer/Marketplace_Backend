import { Request, Response as ExpressResponse } from 'express';
import * as Response from '../helpers/response.manager';
import * as authService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { RoleType } from '../interfaces/jwt.config';

export async function handleAuth(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { public_address: publicAddress, signature } = req.body;
    const { user_type: userType } = req.params;

    const response = await authService.generateAuthToken({
      publicAddress,
      signature,
      roleType: userType === 'admin' ? RoleType.ADMIN : RoleType.USER
    });

    return Response.success(res, {
      message: 'Successful',
      response,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}
