const { dbTables } = require('../constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

  // Clear DB
  await knex(dbTables.nftItems).delete();
  await knex(dbTables.nftCollections).delete();

  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.string('contract_address', 50).notNullable();
    table.string('token_hash').notNullable();
    table.dropUnique(['collection_id', 'token_id']);
    table.unique(['contract_address', 'token_hash']);
    table.string('amount').defaultTo('1');
    table.string('token_uri').notNullable();
  });

  await knex.schema.alterTable(dbTables.nftCollections, table => {
    table.specificType('contract_address', 'varchar[]').alter();
    table.renameColumn('contract_address', 'contract_addresses');
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

  await knex.schema.alterTable(dbTables.nftCollections, table => {
    table.string('contract_addresses').alter();
    table.renameColumn('contract_addresses', 'contract_address');
  });

  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.unique(['collection_id', 'token_id']);
    table.dropUnique(['contract_address', 'token_hash']);
    table.dropColumn('contract_address');
    table.dropColumn('token_hash');
    table.dropColumn('amount');
    table.dropColumn('token_uri');

  });
};
