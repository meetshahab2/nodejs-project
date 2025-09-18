const categoryRepository = require('../repositories/categoryRepository');

exports.create = async (categoryData) => {
  
  const existing = await categoryRepository.findByName(categoryData.name);
  if (existing) {
    throw new Error("The category name must be unique");
  }

  const category = await categoryRepository.createCategory(categoryData);
  return category;
};

exports.getAll = async () => {
  const categories = await categoryRepository.getAllCategories();
  return categories;
};

exports.getById = async (id) => {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

exports.update = async (id, updateData) => {
  const updatedCategory = await categoryRepository.updateCategory(id, updateData);
  if (!updatedCategory) {
    throw new Error('Category not found');
  }
  return updatedCategory;
};

exports.delete = async (id) => {
  const deleted = await categoryRepository.deleteCategory(id);
  if (!deleted) {
    throw new Error('Category not found');
  }
  return deleted;
};
