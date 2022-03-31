import { InsertionMetadata, Metadata, UpdateMetadataRequest } from '../interfaces/nft';
import { Logger } from './Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { dbTables } from '../constants';
import { NftCollection, UpdateCollectionRequest } from '../interfaces/nft.collection';
import { TokenExistsError } from '../interfaces';

const knex = require('../../data/db');

export class KnexHelper {

  static async insertMetadata(metadata: InsertionMetadata): Promise<boolean> {
    await knex(dbTables.nftItems).insert(metadata);
    return true;
  }

  static async getLastTokenIdForCollection(collectionId: string): Promise<number> {
    const result = (await knex(dbTables.nftItems).select().where({ collection_id: collectionId })
      .orderBy('token_id', 'desc').limit(1))[0]?.token_id || 0;
    Logger.Info(result);
    return result;
  }

  static async getAllMetadata(collectionId: string): Promise<Metadata[]> {
    const result = await knex(dbTables.nftItems).select().where({ collection_id: collectionId });
    result.forEach((item: any) => {
      delete item.id;
      delete item.collection_id;
      delete item.token_id;
      delete item.created_at;
      delete item.updated_at;
    });
    return result as Metadata[];
  }

  static async getSingleMetadata(body: GetItemRequest): Promise<Metadata[]> {
    const result = await knex(dbTables.nftItems).select().where({
      collection_id: body.collectionId,
      token_id: body.tokenId
    }).limit(1);
    result.forEach((item: any) => {
      delete item.id;
      delete item.collection_id;
      delete item.token_id;
      delete item.created_at;
      delete item.updated_at;
    });
    return result as Metadata[];
  }

  static async updateMetadata(body: UpdateMetadataRequest): Promise<boolean> {
    Logger.Info(body);
    const result = await knex(dbTables.nftItems)
      .where({ collection_id: body.collectionId, token_id: body.tokenId })
      .update(body.metadata);
    Logger.Info(result);
    return true;
  }

  static async deleteMetadata(body: GetItemRequest): Promise<number> {
    // Deletes entire collection unless tokenId is specified.
    const condition = { collection_id: body.collectionId };
    if (body.tokenId) {
      // @ts-ignore
      condition.token_id = body.tokenId;
    }
    return knex(dbTables.nftItems).where(condition).del();
  }

  /*
  * NFT Collections CRUD
  * */
  static async insertNftCollection(collection: NftCollection): Promise<boolean> {
    await knex(dbTables.nftCollections).insert(collection);
    return true;
  }

  static async getAllNftCollections(): Promise<NftCollection[]> {
    const result = await knex(dbTables.nftCollections).select();
    return result as NftCollection[];
  }

  static async getNftCollection(id: string): Promise<NftCollection[]> {
    const result = await knex(dbTables.nftCollections).select().where({
      id,
    }).limit(1);
    return result as NftCollection[];
  }

  static async updateNftCollection(body: UpdateCollectionRequest): Promise<boolean> {
    Logger.Info(body);
    const result = await knex(dbTables.nftCollections)
      .where({ id: body.id })
      .update({ name: body.name, contract_address: body.contractAddress });
    Logger.Info(result);
    return true;
  }

  static async deleteNftCollection(id: string): Promise<number> {
    const tokenResult = await knex(dbTables.nftItems).count().where({ collection_id: id });
    // Check if collection has tokens, do not delete.
    if (tokenResult.count > 0) {
      throw new TokenExistsError();
    }
    return knex(dbTables.nftCollections).where({ id }).del();
  }
}
