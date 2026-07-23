/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
  return knex.schema.createTable('balances', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('group_id').notNullable();
    table.bigInteger('user_id').notNullable();

    table.decimal('balance', 10, 2).notNullable().defaultTo(0);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table
      .foreign('group_id')
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.unique(['group_id', 'user_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('balances');
};