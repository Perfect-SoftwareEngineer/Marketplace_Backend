import {
  Attribute,
  AttrQueryForm,
  FetchTokenRequest,
  FetchTokenResponse,
  InsertionMetadata,
  Metadata,
  NftItem,
  UpdateMetadataRequest
} from '../interfaces/nft';
import { Logger } from './Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { dbTables } from '../constants';
import { NftCollection, NftCollectionDbReq, UpdateCollectionRequest } from '../interfaces/nft.collection';
import { TokenExistsError } from '../interfaces';
import { GetUserRequest, SaveUserRequest, UpdateDbUserRequest, User } from '../interfaces/user';
import { Admin, GetAdminRequest, SaveAdminRequest, UpdateDbAdminRequest } from '../interfaces/admin';
import { Pagination } from '../interfaces/pagination';
import { Update3dNftItem } from '../interfaces/fetch.and.save.nfts';

import knex from '../../data/db';

export class KnexHelper {

  static async insertMetadata(metadata: InsertionMetadata): Promise<boolean> {
    await knex(dbTables.nftItems).insert(metadata);
    return true;
  }

  static async bulkInsertMetadata(metadataList: InsertionMetadata[]): Promise<boolean> {
    // Save each item insert query string in this array.
    const queries = [];
    for (const metadata of metadataList) {
      const query = knex(dbTables.nftItems).insert(metadata)
        .onConflict(['contract_address', 'token_id'])
        .merge()
        .returning(['contract_address', 'token_id']).toQuery();
      queries.push(query);
    }
    // Call the DB once.
    await knex.raw(queries.join(';'));
    return true;
  }

  static async getAllMetadata(collectionId: string): Promise<Metadata[]> {
    const result = await knex(dbTables.nftItems).select().where({ collection_id: collectionId });
    result.forEach((item: any) => {
      delete item.created_at;
      delete item.updated_at;
    });
    return result as Metadata[];
  }

  static generateAttributeQuery(attributes: Attribute[]): AttrQueryForm {
    if (attributes.length === 0) {
      return { rawQuery: '', values: [] };
    }

    // This helps us extract the elements in the 'attributes' jsonb colum
    // The subsequent conditions allows us to extract fields we care about
    let rawQuery = 'JOIN LATERAL jsonb_array_elements(attributes) obj(val) ON ';
    const values: (string | number)[] = [];
    const queryStrings: string[] = [];

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (!attr.trait_type) {
        queryStrings.push('obj.val->>\'value\' = ?');
        values.push(attr.value);
      } else {
        queryStrings.push('obj.val->>\'trait_type\' = ? AND obj.val->>\'value\' = ?');
        values.push(...[attr.trait_type, attr.value]);
      }
      rawQuery += queryStrings.join(' AND ');
    }
    // The raw query ends up looking like this:
    // JOIN LATERAL jsonb_array_elements(attributes) obj(val) ON obj.val->>'trait_type' = ? AND obj.val->>'value' = ?
    // Replacement values: ["Eyes","Big"]
    return { rawQuery, values };
  }

  static async getAllNfts(fetchTokenRequest: FetchTokenRequest): Promise<FetchTokenResponse> {
    const { rawQuery, values } = this.generateAttributeQuery(fetchTokenRequest.attributes);
    Logger.Info(rawQuery, values);
    const countResult = await knex(dbTables.nftItems)
      .count('* as count')
      .joinRaw(rawQuery, values)
      .where(fetchTokenRequest.fetchFilter)
      .first();

    const result = await knex(dbTables.nftItems)
      .select()
      .joinRaw(rawQuery, values)
      .where(fetchTokenRequest.fetchFilter)
      .offset((fetchTokenRequest.page - 1) * fetchTokenRequest.size)
      .limit(fetchTokenRequest.size);

    result.forEach((item: any) => {
      delete item.id;
      delete item.created_at;
      delete item.updated_at;
      delete item.val;
    });

    const allItems = result as NftItem[];
    const pagination: Pagination = {
      page: fetchTokenRequest.page,
      size: allItems.length,
      last_page: Math.ceil(countResult.count / fetchTokenRequest.size),
      total_count: Number.parseInt(countResult.count),
    };

    return { pagination, items: allItems };
  }

  static async getSingleMetadata(body: GetItemRequest): Promise<NftItem[]> {
    const result = await knex(dbTables.nftItems).select().where({
      contract_address: body.contractAddress,
      token_id: body.tokenId
    }).limit(1);
    result.forEach((item: any) => {
      delete item.id;
      delete item.created_at;
      delete item.updated_at;
    });
    return result as NftItem[];
  }

  static async updateMetadata(body: UpdateMetadataRequest): Promise<boolean> {
    Logger.Info(body);
    const result = await knex(dbTables.nftItems)
      .where({ contract_address: body.contractAddress, token_id: body.tokenId })
      .update(body.metadata);
    Logger.Info(result);
    return true;
  }

  static async deleteMetadata(body: GetItemRequest): Promise<number> {
    // Deletes entire collection unless tokenId is specified.
    const condition: { contract_address: string, token_id?: string } = { contract_address: body.contractAddress };
    if (body.tokenId) {
      condition.token_id = body.tokenId;
    }
    return knex(dbTables.nftItems).where(condition).del();
  }

  /*
  * NFT Collections CRUD
  * */
  static async insertNftCollection(collection: NftCollectionDbReq): Promise<boolean> {
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

  /*
  * Users CRUD
  * */
  static async insertUser(user: SaveUserRequest): Promise<boolean> {
    await knex(dbTables.users).insert(user);
    return true;
  }

  static async getUsers(request: GetUserRequest): Promise<User[]> {
    const result = await knex(dbTables.users).select().where(request);
    return result as User[];
  }

  static async updateUser(public_address: string, body: UpdateDbUserRequest): Promise<boolean> {
    // Always have a new Nonce
    if (!body.nonce) {
      body.nonce = Math.floor(Math.random() * 1000000);
    }
    await knex(dbTables.users)
      .where({ public_address })
      .update(body);
    return true;
  }

  /*
  * Admins CRUD
  * */
  static async insertAdmin(admin: SaveAdminRequest): Promise<boolean> {
    await knex(dbTables.admins).insert(admin);
    return true;
  }

  static async getAdmins(request: GetAdminRequest): Promise<Admin[]> {
    const result = await knex(dbTables.admins).select().where(request);
    return result as Admin[];
  }

  static async updateAdmin(public_address: string, body: UpdateDbAdminRequest): Promise<boolean> {
    // Always have a new Nonce
    if (!body.nonce) {
      body.nonce = Math.floor(Math.random() * 1000000);
    }
    await knex(dbTables.admins)
      .where({ public_address })
      .update(body);
    return true;
  }


  static async updateTokens3dUrl(metaItems: Update3dNftItem[]) {
    // Save each item insert query string in this array.
    const queries = [];
    for (const metaItem of metaItems) {
      const query = knex(dbTables.nftItems)
        .where({ contract_address: metaItem.contractAddress, token_id: metaItem.tokenId })
        .update({ 'meta_3d_url': metaItem.meta3dUrl })
        .toQuery();
      queries.push(query);
    }
    // Call the DB once.
    return knex.raw(queries.join('; '));
  }
}
