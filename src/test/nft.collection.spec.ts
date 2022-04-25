import { KnexHelper } from '../helpers/knex.helper';
import sinon from 'sinon';
import * as collectionService from '../services/collection.service';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';


const collectionId = 'luna_game_3d';

const collectionData = {
  id: collectionId,
  name: 'Luna Game 3d',
  contract_address: 'contractAddress',
};

const collectionRequestBody = {
  id: collectionId,
  name: 'Luna Game 3d',
  contractAddress: 'contractAddress',
};

describe('Add Collection', () => {

  beforeEach(() => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([]);
    KnexHelper.insertNftCollection = sinon.stub().withArgs(collectionRequestBody).returns(true);
  });

  it('should add a collection', async () => {
    const res = await collectionService.addCollectionInfo(collectionRequestBody);
    expect(res).toEqual(true);
  });
});

describe('Get Collections', () => {

  beforeEach(() => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([collectionData]);
    KnexHelper.getAllNftCollections = sinon.stub().returns([collectionData]);
  });

  it('should return a collection', async () => {
    const res = await collectionService.getCollectionInfo(collectionId);
    expect(res).toEqual(collectionData);
  });

  it('should throw not found error', async () => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([]);
    try {
      await collectionService.getCollectionInfo(collectionId);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect((e as CustomError).code).toEqual(StatusCodes.NOT_FOUND);
    }
  });

  it('should return all collections', async () => {
    const res = await collectionService.getAllCollectionInfo();
    expect(res).toEqual([collectionData]);
  });

});

describe('Update a collection', () => {

  beforeEach(() => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([collectionData]);
    KnexHelper.updateNftCollection = sinon.stub().withArgs({
      id: collectionId,
      name: 'New Name',
    }).returns(true);
  });

  it('should collection details', async () => {
    const res = await collectionService.updateCollectionInfo({
      id: collectionId,
      name: 'New Name',
    });
    expect(res).toEqual(true);
  });

});

describe('Delete an NFT', () => {

  beforeEach(() => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([collectionData]);
    KnexHelper.deleteNftCollection = sinon.stub().withArgs(collectionId).returns(1);
  });

  it('should delete token', async () => {
    const res = await collectionService.deleteCollectionInfo(collectionId);
    expect(res).toEqual(1);
  });

  it('should throw not found error', async () => {
    KnexHelper.getNftCollection = sinon.stub().withArgs(collectionId).returns([]);
    try {
      await collectionService.deleteCollectionInfo(collectionId);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect((e as CustomError).code).toEqual(StatusCodes.NOT_FOUND);
    }
  });
});
