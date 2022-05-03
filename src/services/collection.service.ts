import { Logger } from '../helpers/Logger';
import { KnexHelper } from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { StatusCodes } from 'http-status-codes';
import { NftCollection, UpdateCollectionRequest } from '../interfaces/nft.collection';

export async function addCollectionInfo(request: NftCollection): Promise<boolean> {
  const result = await KnexHelper.getNftCollection(request.id);
  if (result.length !== 0) {
    throw new CustomError(StatusCodes.BAD_REQUEST, 'Collection already exists');
  }
  return await KnexHelper.insertNftCollection({
    id: request.id,
    name: request.name,
    contract_addresses: request.contractAddresses
  });
}

export async function getAllCollectionInfo(): Promise<NftCollection[]> {
  Logger.Info('Getting all NFT collections');
  const result = await KnexHelper.getAllNftCollections();
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'No Collections yet');
  }
  return result;
}

export async function getCollectionInfo(collectionId: string): Promise<NftCollection> {
  Logger.Info(`Getting NFT collections ${collectionId}`);
  const result = await KnexHelper.getNftCollection(collectionId);
  if (result.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Collection was not found');
  }
  return result[0];
}

export async function updateCollectionInfo(request: UpdateCollectionRequest): Promise<boolean> {
  Logger.Info('Running collection update process', request);
  await getCollectionInfo(request.id);
  const response = await KnexHelper.updateNftCollection(request);
  Logger.Info(response);
  return true;
}

export async function deleteCollectionInfo(collectionId: string): Promise<number> {
  Logger.Info('Running delete process for', collectionId);
  const result = await KnexHelper.deleteNftCollection(collectionId);
  if (result === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'Collection was not found');
  }
  Logger.Info(result);
  return result;
}
