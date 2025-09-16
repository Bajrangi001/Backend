const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// ➤ Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get All Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category", "name");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get Single Subcategory
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category", "name");
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    if (name) subcategory.name = name;
    if (categoryId) subcategory.category = categoryId;

    await subcategory.save();
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};