import { Request, Response as ExpressResponse } from 'express';
import * as Response from '../helpers/response.manager';
import * as userService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

export async function handleAddUser(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { publicAddress } = req.body;
    const user = await userService.addUser({ public_address: publicAddress });

    return Response.success(res, {
      message: 'Successful',
      user,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleGetUsers(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { publicAddress } = req.query;
    const users = await userService.getUsers({ public_address: publicAddress?.toString() });

    return Response.success(res, {
      message: 'Successful',
      users,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleUpdateUser(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { publicAddress } = req.params;
    const { username } = req.body;

    const user = await userService.updateUser({ public_address: publicAddress, username });

    return Response.success(res, {
      message: 'Successful',
      user,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}
