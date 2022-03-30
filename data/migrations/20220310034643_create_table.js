const {NftStatus, NftType, TokenFormat, ListingStatus} = require("../../src/interfaces");
const {dbTables} = require("../../src/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.schema.createTable(dbTables.nftCollections, table => {
            // collectionId is needed to separate metadata for different nft collections
            table.string('id', 30).notNullable().unique();
            table.string('name').notNullable();
            table.string('contract_address').notNullable().index();

            table.timestamps();
        });

        await knex.schema.createTable(dbTables.nftItems, table => {
            table.increments();
            // collectionId is needed to separate metadata for different nft collections
            table.string('collection_id', 30).notNullable().index()
                .references('id').inTable(dbTables.nftCollections)
                .onDelete('SET NULL');

            table.enum('nft_type', [NftType.AVATAR, NftType.ACCESSORY, NftType.GAME_ITEM]).notNullable();
            table.enum('token_format', [TokenFormat.ERC721, TokenFormat.ERC1155]).notNullable();

            // tokenId: Number of the NFT in its collection
            table.integer('token_id');
            table.text('image').nullable();
            table.text('image_data').nullable();
            table.text('external_url').nullable();
            table.text('description').notNullable();
            table.string('owner_address').nullable();
            // Max character length of 50 is typically fine
            table.string('name', 50).notNullable();

            // attributes object is serialized to a string
            // For filtering | We can query the json with whereJsonObject
            table.json('attributes').notNullable();
            table.string('background_color').nullable();
            table.text('animation_url').nullable();
            table.text('youtube_url').nullable();

            table.enum('status', [NftStatus.LISTED, NftStatus.SOLD, NftStatus.UNLISTED]).defaultTo('UNLISTED');
            // Make combined unique; ensure unique token id per collection and also helps for fast querying
            table.unique(['collection_id', 'token_id']);
            table.timestamps();
        });

        await knex.schema.createTable(dbTables.nftListings, table => {
            table.increments();
            table.integer('nft_item_id', 30).unsigned().unique().notNullable()
                .references('id').inTable(dbTables.nftItems)
                .onDelete('CASCADE');

            table.double('price').notNullable();
            table.string('currency').notNullable();
            table.enum('status', [ListingStatus.ACTIVE, ListingStatus.CLOSED, ListingStatus.SOLD]).notNullable();
            table.timestamps();
        });
    } catch (e) {
        console.error(e);
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(dbTables.nftListings);
    await knex.schema.dropTableIfExists(dbTables.nftItems);
    await knex.schema.dropTableIfExists(dbTables.nftCollections);
};
