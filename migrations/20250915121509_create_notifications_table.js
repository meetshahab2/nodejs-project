/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */

exports.up = function (knex) {
  return knex.schema.createTable('notifications', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('user_id').notNullable();

    table
      .enu('type', ['expense', 'settlement'])
      .notNullable();

    table.text('message').notNullable();
    table.boolean('is_read').notNullable().defaultTo(false);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};