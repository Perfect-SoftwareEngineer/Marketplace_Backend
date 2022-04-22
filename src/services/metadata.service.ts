import { Request } from 'express';

import { Logger } from '../helpers/Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import {
  AddMetadataRequest,
  Attribute, BatchAddMetadataRequest,
  FetchTokenFilter,
  FetchTokenRequest, FetchTokenResponse, InsertionMetadata,
  Metadata, NftItem,
  UpdateMetadataRequest
} from '../interfaces/nft';
import { KnexHelper } from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';
import { nftStatus, nftTypes, tokenFormats } from '../constants';

const mustDeleteError = 'Token must have been deleted before you can insert';

export async function addItem(request: AddMetadataRequest): Promise<string> {

  // Check if token is already saved in the DB.
  const result = await KnexHelper.getSingleMetadata({
    collectionId: request.collectionId,
    tokenId: request.tokenId,
  });

  if (result.length !== 0) {
    throw new CustomError(StatusCodes.FORBIDDEN, mustDeleteError);
  }

  // Use pre-sent token or generate new id
  Logger.Info(`Adding new token metadata with id: ${request.tokenId} for collection ${request.collectionId}`);

  request.metadata.attributes = JSON.stringify(request.metadata.attributes);
  await KnexHelper.insertMetadata({
    ...request.metadata,
    token_id: request.tokenId,
    collection_id: request.collectionId,
    token_hash: request.metadata.token_hash || request.tokenId,
  });
  return request.tokenId;
}

export async function batchAddItems(request: BatchAddMetadataRequest): Promise<string> {
  Logger.Info(`Adding multiple token metadata for collection ${request.collectionId}`);
  const listToSave: InsertionMetadata[] = [];
  request.metadataList.forEach(metadata => {
    listToSave.push({
      ...metadata,
      collection_id: request.collectionId,
      token_hash: metadata.token_hash || metadata.token_id,
    });
  });
  const result = await KnexHelper.bulkInsertMetadata(listToSave);
  Logger.Info(result);
  return request.collectionId;
}

export async function getSingleItem(request: GetItemRequest): Promise<NftItem> {
  const result = await KnexHelper.getSingleMetadata(request);
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Token metadata was not found');
  }
  return result[0];
}

export async function getAllItems(req: Request): Promise<FetchTokenResponse> {
  const { collection_id } = req.params;
  const { nft_type, token_format, chain, status, attributes, page, size } = req.query;
  const whereClauseFilter: FetchTokenFilter = {};
  if (collection_id) {
    whereClauseFilter.collection_id = <string>collection_id;
  }
  if (nft_type && nftTypes.includes(nft_type.toString())) {
    whereClauseFilter.nft_type = <string>nft_type;
  }
  if (token_format && tokenFormats.includes(token_format.toString())) {
    whereClauseFilter.token_format = <string>token_format;
  }
  if (chain) {
    whereClauseFilter.chain = <string>chain;
  }
  if (status && nftStatus.includes(status.toString())) {
    whereClauseFilter.status = <string>status;
  } else {
    whereClauseFilter.status = 'LISTED';
  }

  let filterAttr: Attribute[] = [];
  if (attributes) {
    filterAttr = JSON.parse(<string>attributes) as unknown as Attribute[];
  }

  let nPage = 1;
  let nSize = 50;
  if (page && !Number.isNaN(<string>page)) {
    nPage = Number.parseInt(<string>page);
  }

  if (size && !Number.isNaN(<string>size)) {
    nSize = Number.parseInt(<string>size);
  }

  const fetchTokenRequest: FetchTokenRequest = {
    fetchFilter: whereClauseFilter,
    attributes: filterAttr,
    page: nPage,
    size: nSize
  };

  const { items, pagination } = await KnexHelper.getAllNfts(fetchTokenRequest);

  if (items.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Token metadata was not found');
  }
  return { items, pagination };
}

export async function updateItem(request: UpdateMetadataRequest): Promise<boolean> {
  Logger.Info('Running update process', request);
  await getSingleItem({ collectionId: request.collectionId, tokenId: request.tokenId });
  const response = await KnexHelper.updateMetadata(request);
  Logger.Info(response);
  return true;
}

export async function deleteItem(request: GetItemRequest): Promise<number> {
  Logger.Info('Running delete process');
  Logger.Info(request);
  const result = await KnexHelper.deleteMetadata(request);
  if (result === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Token metadata was not found');
  }
  Logger.Info(result);
  return result;
}
