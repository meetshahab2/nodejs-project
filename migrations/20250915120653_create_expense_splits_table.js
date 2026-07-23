/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('expense_splits', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('expense_id').notNullable();
    table.bigInteger('user_id').notNullable();
    table.decimal('share_amount', 10, 2).notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table
      .foreign('expense_id')
      .references('id')
      .inTable('expenses')
      .onDelete('CASCADE');

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('expense_splits');
};