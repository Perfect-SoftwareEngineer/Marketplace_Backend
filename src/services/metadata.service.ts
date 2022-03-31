import { Logger } from '../helpers/Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { AddMetadataRequest, Metadata, UpdateMetadataRequest } from '../interfaces/nft';
import {KnexHelper} from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';

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
  await KnexHelper.insertMetadata({ ...request.metadata, token_id: request.tokenId, collection_id: request.collectionId });
  return request.tokenId;
}

export async function getAllItems(collectionId: string): Promise<Metadata[]> {
  Logger.Info(`Getting all metadata for collection: ${collectionId}`);
  const result = await KnexHelper.getAllMetadata(collectionId);
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Token metadata was not found');
  }
  return result;
}

export async function getSingleItem(request: GetItemRequest): Promise<Metadata> {
  const result = await KnexHelper.getSingleMetadata(request);
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Token metadata was not found');
  }
  return result[0];
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
