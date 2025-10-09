const express = require("express");
const router = express.Router();
const {
  createSubSubcategory,
  getSubSubcategories,
  getSubSubcategoryById,
  updateSubSubcategory,
  deleteSubSubcategory,
} = require("../controllers/subSubcategoryController");
const { protect } = require("../middleware/authMiddleware"); // Updated to match the export

// Public GET routes
router.get("/", getSubSubcategories);
router.get("/:id", getSubSubcategoryById);

// Protected routes
router.post("/", protect, createSubSubcategory); // Line 14 should be this
router.put("/:id", protect, updateSubSubcategory);
router.delete("/:id", protect, deleteSubSubcategory);

module.exports = router;