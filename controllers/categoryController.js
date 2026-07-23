const categoryService = require('../services/categoryService');

exports.create = async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await categoryService.create(req.body);
    res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (error) {
    console.error("Category create error:", error);

    if (error.message === "The category name must be unique") {
      return res.status(409).json({ message: error.message }); 
    }

    res.status(500).json({ message: "Failed to create category" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json({
      message: "Categories fetched successfully",
      categories
    });
  } catch (error) {
    console.error("Category getAll error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      category
    });
  } catch (error) {
    console.error("Category getById error:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updatedCategory = await categoryService.update(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory
    });
  } catch (error) {
    console.error("Category update error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await categoryService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Category delete error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};