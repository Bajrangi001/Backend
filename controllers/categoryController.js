// controllers/categoryController.js
const Category = require("../models/Category");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const exist = await Category.findOne({ name });
    if (exist) return res.status(400).json({ message: "Category already exists" });

    const cat = await Category.create({ name, description });
    res.status(201).json(cat);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const list = await Category.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const del = await Category.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};