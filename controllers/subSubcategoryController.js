const SubSubcategory = require("../models/SubSubcategory");

// Create a new sub-subcategory
const createSubSubcategory = async (req, res) => {
  try {
    // if (req.user?.role !== "admin") {
    //   return res.status(403).json({ message: "Admin access required" });
    // }
    const { name, description, parentSubcategory } = req.body;
    if (!name || !parentSubcategory) {
      return res.status(400).json({ message: "Name and parent subcategory are required" });
    }

    const existingSubSubcategory = await SubSubcategory.findOne({ name, parentSubcategory });
    if (existingSubSubcategory) {
      return res.status(400).json({ message: "Sub-subcategory already exists for this subcategory" });
    }

    const subSubcategory = await SubSubcategory.create({ name, description, parentSubcategory });
    res.status(201).json(subSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sub-subcategories
const getSubSubcategories = async (req, res) => {
  try {
    const subSubcategories = await SubSubcategory.find().sort({ createdAt: -1 })
      .populate("parentSubcategory")
      .populate("products");
    res.json(subSubcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single sub-subcategory by ID
const getSubSubcategoryById = async (req, res) => {
  try {
    const subSubcategory = await SubSubcategory.findById(req.params.id)
      .populate("parentSubcategory")
      .populate("products");
    if (!subSubcategory) return res.status(404).json({ message: "Sub-subcategory not found" });
    res.json(subSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a sub-subcategory
const updateSubSubcategory = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    const updatedSubSubcategory = await SubSubcategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedSubSubcategory) return res.status(404).json({ message: "Sub-subcategory not found" });
    res.json(updatedSubSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a sub-subcategory
const deleteSubSubcategory = async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    const deletedSubSubcategory = await SubSubcategory.findByIdAndDelete(req.params.id);
    if (!deletedSubSubcategory) return res.status(404).json({ message: "Sub-subcategory not found" });
    res.json({ message: "Sub-subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubSubcategory,
  getSubSubcategories,
  getSubSubcategoryById,
  updateSubSubcategory,
  deleteSubSubcategory,
};