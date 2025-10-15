const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// Create subcategory
const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and category ID are required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();

    // Add subcategory to the category's subcategories array
    category.subcategories.push(subcategory._id);
    await category.save();

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subcategories
const getSubcategories = async (req, res) => {
  try {
    // Extract categoryId from query parameters
    const { categoryId } = req.query;

    // Create filter condition dynamically
    const filter = categoryId ? { category: categoryId } : {};

    // Fetch subcategories based on filter
    const subcategories = await Subcategory.find(filter)
      .populate("category", "name");

    // Send response
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single subcategory by ID with products
const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id)
      .populate("category", "name")
      .populate({
        path: "products",
        model: "Product",
      });
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update subcategory
const updateSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    if (name) subcategory.name = name;
    if (categoryId) subcategory.category = categoryId;

    await subcategory.save();
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    // Remove subcategory from the category's subcategories array
    await Category.findByIdAndUpdate(
      subcategory.category,
      { $pull: { subcategories: subcategory._id } }
    );

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};
