/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('expense_splits', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('expense_id').unsigned().notNullable();
    table.bigInteger('user_id').unsigned().notNullable();
    table.decimal('share_amount', 10, 2).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      .nullable();

    table.foreign('expense_id').references('id').inTable('expenses').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('expense_splits');
};
