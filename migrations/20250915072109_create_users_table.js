exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
