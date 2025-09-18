/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('balances', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('group_id').unsigned().notNullable();
    table.bigInteger('user_id').unsigned().notNullable();
    table.decimal('balance', 10, 2).notNullable().defaultTo(0.00);

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      .nullable();

    table.foreign('group_id').references('id').inTable('groups').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    table.unique(['group_id', 'user_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('balances');
};
