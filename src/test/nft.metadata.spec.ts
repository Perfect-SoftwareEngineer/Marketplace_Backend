import { KnexHelper } from '../helpers/knex.helper';
import sinon from 'sinon';
import request from 'supertest';

import { createRequestBody, getAllNftItems, itemPagination, updateRequestBody } from './data/nft.data';
import * as metadataService from '../services';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';
import { FetchTokenRequest } from '../interfaces/nft';
import { NftStatus, NftType } from '../interfaces';
import app from '../app';


const collectionId = 'luna_game_3d';
const tokenId = '1';

const fetchTokenRequest: FetchTokenRequest = {
  fetchFilter: { collection_id: collectionId, nft_type: NftType.AVATAR, status: NftStatus.UNLISTED },
  attributes: [{ trait_type: 'Eyes', value: 'Big' }],
  page: 1,
  size: 50,
};

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
  });

  it('should return a token', async () => {
    const res = await metadataService.getSingleItem({ collectionId, tokenId });
    expect(res).toEqual(createRequestBody);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    const res = await metadataService.deleteItem({ collectionId, tokenId });
    expect(res).toEqual(1);
  });

  it('should throw not found error', async () => {
    KnexHelper.getSingleMetadata = sinon.stub().withArgs({ collectionId, tokenId }).returns([]);
    try {
      await metadataService.deleteItem({ collectionId, tokenId });
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect((e as CustomError).code).toEqual(StatusCodes.NOT_FOUND);
    }
  });
});

describe('Get all  metadata', () => {

  beforeEach(() => {
    KnexHelper.getAllNfts = sinon.stub().withArgs(fetchTokenRequest).returns({
      items: getAllNftItems,
      pagination: itemPagination,
    });
  });

  const metaUrl = `/nft/${collectionId}/metadata`;

  it(`GET ${metaUrl} - Should return 200`, async () => {
    await request(app)
      .get(metaUrl)
      .then((res: any) => {
        expect(res.body.data.items[0].token_id).toEqual('001');
      });
  });

});
