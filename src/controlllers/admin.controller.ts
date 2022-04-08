import { Request, Response as ExpressResponse } from 'express';
import * as Response from '../helpers/response.manager';
import * as adminService from '../services/admin.service';
import { StatusCodes } from 'http-status-codes';

export async function handleAddAdmin(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { public_address: publicAddress } = req.body;
    const admin = await adminService.addAdmin({ public_address: publicAddress });

    return Response.success(res, {
      message: 'Successful',
      admin,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleGetAdmins(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { public_address: publicAddress } = req.query;
    const response = await adminService.getAdmins({ public_address: publicAddress?.toString() });

    return Response.success(res, {
      message: 'Successful',
      response
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}

export async function handleUpdateAdmin(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const { public_address } = req.params;
    const { username } = req.body;

    const admin = await adminService.updateAdmin({ public_address, username });

    return Response.success(res, {
      message: 'Successful',
      admin,
    }, StatusCodes.OK);
  } catch (err: any) {
    return Response.handleError(res, err);
  }
}
