const { dbTables } = require('../constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.string('meta_3d_url').nullable();
    table.jsonb('attributes').alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable(dbTables.nftItems, table => {
    table.dropColumn('meta_3d_url');
    table.json('attributes').alter();
  });
};
