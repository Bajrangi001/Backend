const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Destructure protect from authMiddleware
const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");

// Protected routes
router.post("/", protect, createSubcategory);
router.get("/", protect, getSubcategories);
router.get("/:id", protect, getSubcategoryById);
router.put("/:id", protect, updateSubcategory);
router.delete("/:id", protect, deleteSubcategory);

module.exports = router;