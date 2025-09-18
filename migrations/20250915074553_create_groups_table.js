exports.up = function (knex) {
  return knex.schema.createTable('groups', function (table) {
    table.bigIncrements('id').primary();
    table.string('name', 150).notNullable();
    table.bigInteger('created_by').unsigned().notNullable(); // must be unsigned to match users.id
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable().defaultTo(null);

    table.foreign('created_by').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('groups');
};
