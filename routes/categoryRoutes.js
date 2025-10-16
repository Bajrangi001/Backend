// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,  // Ensure this matches the exported function name
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);  // Ensure this matches the exported function name
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
