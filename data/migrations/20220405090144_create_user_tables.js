const {dbTables} = require("../constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable(dbTables.admins, table => {
        table.increments();
        table.string('username').nullable();
        table.string('public_address').notNullable().unique();
        table.integer('nonce').unsigned().defaultTo(Math.floor(Math.random() * 1000000));

        table.timestamps(true, true);
    });

    await knex.schema.createTable(dbTables.users, table => {
        table.increments();
        table.string('username').nullable();
        table.string('public_address').notNullable().unique();
        table.integer('nonce').unsigned().defaultTo(Math.floor(Math.random() * 1000000));

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(dbTables.admins);
    await knex.schema.dropTableIfExists(dbTables.users);
};
