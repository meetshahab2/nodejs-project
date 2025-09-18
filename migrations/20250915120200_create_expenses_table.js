/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', function (table) {
    table.bigIncrements('id').primary();
    table.bigInteger('group_id').unsigned().nullable();
    table.bigInteger('payer_id').unsigned().notNullable();
    table.bigInteger('category_id').unsigned().nullable(); // new FK for categories
    table.decimal('amount', 10, 2).notNullable();
    table.date('expense_date').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      .nullable();

    // foreign keys
    table.foreign('group_id').references('id').inTable('groups').onDelete('SET NULL');
    table.foreign('payer_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('expenses');
};
