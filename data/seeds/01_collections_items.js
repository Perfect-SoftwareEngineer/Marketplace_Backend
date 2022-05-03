const { dbTables, testMetadata } = require("../constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const collectionId = 'luna_game_3d';
const collectionData = {
  id: collectionId,
  name: 'Luna Game 3d',
  contract_address: ['contractAddress0'],
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(dbTables.nftItems).del();
  await knex(dbTables.nftCollections).del();

  await knex(dbTables.nftCollections).insert([
    collectionData,
  ]);

  await knex(dbTables.nftItems).insert([
    {
      collection_id: collectionId,
      token_id: '001',
      contract_address: 'contractAddress0',
      ...testMetadata,
    }
  ]);
};
