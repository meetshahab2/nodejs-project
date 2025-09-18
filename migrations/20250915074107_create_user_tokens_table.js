exports.up = function (knex) {
  return knex.schema.createTable('user_tokens', function (table) {
    table.bigIncrements('id').primary();
    table.bigInteger('user_id').notNullable();
    table.text('access_token').nullable();
    table.text('refresh_token').notNullable();
    table.dateTime('access_expires_at').nullable();
    table.dateTime('refresh_expires_at').nullable();
    table.dateTime('expires_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable().defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_tokens');
};
