exports.up = function (knex) {
  return knex.schema.createTable('group_members', function (table) {
    table.bigIncrements('id').primary();
    table.bigInteger('group_id').unsigned().notNullable();
    table.bigInteger('user_id').unsigned().notNullable();
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable().defaultTo(null);

    table
      .foreign('group_id')
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('group_members');
};
