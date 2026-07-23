exports.up = function (knex) {
  return knex.schema.alterTable('user_tokens', (table) => {
    table.unique('user_id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('user_tokens', (table) => {
    table.dropUnique('user_id');
  });
};