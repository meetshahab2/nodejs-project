/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('notifications', function (table) {
    table.bigIncrements('id').primary();

    table.bigInteger('user_id').unsigned().notNullable();
    table.enum('type', ['expense', 'settlement']).notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').defaultTo(false);

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      .nullable();

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};
