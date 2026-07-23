/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('group_id').nullable();
    table.bigInteger('payer_id').notNullable();
    table.bigInteger('category_id').nullable();

    table.decimal('amount', 10, 2).notNullable();
    table.date('expense_date').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    // Foreign Keys
    table
      .foreign('group_id')
      .references('id')
      .inTable('groups')
      .onDelete('SET NULL');

    table
      .foreign('payer_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('expenses');
};