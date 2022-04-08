import { Logger } from '../helpers/Logger';
import { KnexHelper } from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';
import { Admin, GetAdminRequest, SaveAdminRequest, UpdateAdminRequest } from '../interfaces/admin';

export async function addAdmin(request: SaveAdminRequest): Promise<Admin> {
  const result = await KnexHelper.getAdmins({ public_address: request.public_address });
  if (result.length !== 0) {
    throw new CustomError(StatusCodes.BAD_REQUEST, 'Admin already exists');
  }
  await KnexHelper.insertAdmin(request);
  return (await getAdmins({ public_address: request.public_address }))[0];
}

export async function getAdmins(request: GetAdminRequest): Promise<Admin[]> {
  Logger.Info('Getting Admin...', request);
  const result = await KnexHelper.getAdmins(request);
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'No admin found');
  }
  return result;
}

export async function updateAdmin(request: UpdateAdminRequest): Promise<Admin> {
  Logger.Info('Running admin update process', request);
  await getAdmins({ public_address: request.public_address });
  const response = await KnexHelper.updateAdmin(request.public_address, { username: request.username });
  Logger.Info(response);
  return (await getAdmins({ public_address: request.public_address }))[0];
}
