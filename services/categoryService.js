const categoryRepository = require('../repositories/categoryRepository');
const db = require('../config/db');
exports.create = async (categoryData) => {
  const [category] = await db('categories')
    .insert({
      name: categoryData.name,
      description: categoryData.description || null,
    })
    .returning(['id', 'name', 'description', 'created_at']); 

  return category;
};

exports.getAll = async () => {
  return await categoryRepository.getAllCategories();
};

exports.getById = async (id) => {
  return await categoryRepository.findCategoryById(id);
};

exports.update = async (id, updateData) => {
  if (updateData.name) {
    const existing = await categoryRepository.findByName(updateData.name.trim());
    if (existing && existing.id != id) {
      throw new Error("The category name must be unique");
    }
    updateData.name = updateData.name.trim();
  }
  return await categoryRepository.updateCategory(id, updateData);
};

exports.delete = async (id) => {
  return await categoryRepository.deleteCategory(id);
};