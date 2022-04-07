const { dbTables } = require("../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const publicAddress = '0x22a8cd3a7a07527B3447eB42Db073342b36c1D49';

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(dbTables.admins).del()
  await knex(dbTables.admins).insert([
    {
      id: 1,
      public_address: publicAddress,
    }
  ]);
  await knex(dbTables.admins).where({ public_address: publicAddress }).update({
    username: 'hashcode'
  })
};
