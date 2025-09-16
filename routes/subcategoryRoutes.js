const express = require("express");
const router = express.Router();
// const protect = require("../middleware/protect"); // Import the protect middleware
const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
} = require("../controllers/subcategoryController");
const protect = require("../middleware/authMiddleware");

// Apply the protect middleware to all routes that require authentication
router.post("/", protect, createSubcategory);
router.get("/", protect, getSubcategories);
router.get("/:id", protect, getSubcategoryById);
router.put("/:id", protect, updateSubcategory);
router.delete("/:id", protect, deleteSubcategory);

module.exports = router;
