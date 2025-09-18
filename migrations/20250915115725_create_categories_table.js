/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('categories', function (table) {
    table.bigIncrements('id').primary();
    table.string('name', 100).notNullable().unique();
    table.text('description').nullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      .nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
