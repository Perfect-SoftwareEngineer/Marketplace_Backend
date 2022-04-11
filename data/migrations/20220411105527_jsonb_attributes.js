const { dbTables } = require('../constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.jsonb('attributes').alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.json('attributes').alter();
  });
};
