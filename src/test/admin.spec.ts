import { KnexHelper } from '../helpers/knex.helper';
import sinon from 'sinon';
import * as adminService from '../services/admin.service';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';


const publicAddress = 'publicAddress';

const adminData = {
  id: 1,
  public_address: publicAddress,
  username: 'lekky',
}

const adminRequestBody = { public_address: publicAddress }

describe('Add Admin', () => {

  beforeEach(() => {
    KnexHelper.getAdmins = sinon.stub().withArgs(adminRequestBody).returns([]);
    KnexHelper.insertAdmin = sinon.stub().withArgs(adminRequestBody).returns(true);
  });

  it('should add a collection', async () => {
    const res = await adminService.addAdmin(adminRequestBody);
    expect(res).toEqual(true);
  });
});

describe('Get Admin by public address', () => {

  beforeEach(() => {
    KnexHelper.getAdmins = sinon.stub().withArgs(adminRequestBody).returns([adminData]);
  });

  it('should return an admin', async () => {
    const res = await adminService.getAdmins(adminRequestBody);
    expect(res).toEqual([adminData]);
  });

  it('should throw not found error', async () => {
    KnexHelper.getAdmins = sinon.stub().withArgs(adminRequestBody).returns([]);
    try {
      await adminService.getAdmins(adminRequestBody);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect((e as CustomError).code).toEqual(StatusCodes.NOT_FOUND);
    }
  });
});

describe('Update an Admin', () => {

  beforeEach(() => {
    KnexHelper.getAdmins = sinon.stub().withArgs(adminRequestBody).returns([adminData]);
    KnexHelper.updateAdmin = sinon.stub().withArgs(publicAddress, {
      username: 'Hashcode',
    }).returns(true);
  });

  it('should collection details', async () => {
    // @ts-ignore
    const res = await adminService.updateAdmin(publicAddress, {
      username: 'Hashcode',
    });
    expect(res).toEqual(true);
  });

});
