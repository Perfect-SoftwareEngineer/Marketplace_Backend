import { KnexHelper } from '../helpers/knex.helper';
import sinon from 'sinon';
import { createRequestBody, updateRequestBody } from './data/nft.data';
import * as metadataService from '../services';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';


const collectionId = 'luna_game_3d';
const tokenId = '1';

describe('Add NFTs', () => {

  beforeEach(() => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([]);
    KnexHelper.insertMetadata = sinon.stub().withArgs({
      collection_id: collectionId,
      token_id: tokenId, ...createRequestBody
    }).returns(true);
  });

  it('should add a token', async () => {
    const res = await metadataService.addItem({ collectionId, tokenId, metadata: createRequestBody });
    expect(res).toEqual('1');
  });
});

describe('Get NFTs', () => {

  beforeEach(() => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([createRequestBody]);
    KnexHelper.getAllMetadata = sinon.stub().withArgs({ collectionId }).returns([createRequestBody]);
  });

  it('should return a token', async () => {
    const res = await metadataService.getSingleItem({ collectionId, tokenId });
    expect(res).toEqual(createRequestBody);
  });

  it('should return a token', async () => {
    const res = await metadataService.getAllItems(collectionId);
    expect(res).toEqual([createRequestBody]);
  });

});

describe('Update an NFT', () => {

  beforeEach(() => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([createRequestBody]);
    KnexHelper.updateMetadata = sinon.stub().withArgs({
      collectionId,
      tokenId,
      metadata: updateRequestBody
    }).returns(true);
  });

  it('should update token details', async () => {
    // @ts-ignore
    const res = await metadataService.updateItem({ collectionId, tokenId, metadata: updateRequestBody });
    expect(res).toEqual(true);
  });

});

describe('Delete an NFT', () => {

  beforeEach(() => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([createRequestBody]);
    KnexHelper.deleteMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns(1);
  });

  it('should delete token', async () => {
    // @ts-ignore
    const res = await metadataService.deleteItem({ collectionId, tokenId });
    expect(res).toEqual(1);
  });

  it('should throw not found error', async () => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([]);
    try {
      const res = await metadataService.deleteItem({ collectionId, tokenId });
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect((e as CustomError).code).toEqual(StatusCodes.NOT_FOUND);
    }
  });
});
