const { dbTables } = require('../constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.dropUnique(['contract_address', 'token_hash']);
    table.string('token_hash').nullable().alter();
    table.unique(['contract_address', 'token_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

};
