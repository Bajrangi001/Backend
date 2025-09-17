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

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);  // Ensure this matches the exported function name
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
