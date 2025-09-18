const knex = require('../config/db');

exports.createCategory = async (data) => {
  const [id] = await knex('categories').insert(data);
  return { id, ...data };
};

exports.getAllCategories = async () => {
  return await knex('categories').select('*');
};

exports.findByName = async (name) => {
  const category = await knex("categories")
    .where({ name })
    .first();
  return category;
};

exports.findCategoryById = async (id) => {
  return await knex('categories').where({ id }).first();
};

exports.updateCategory = async (id, data) => {
  const affectedRows = await knex('categories').where({ id }).update(data);
  if (affectedRows === 0) return null;
  return this.findCategoryById(id);
};

exports.deleteCategory = async (id) => {
  const affectedRows = await knex('categories').where({ id }).del();
  return affectedRows > 0;
};
