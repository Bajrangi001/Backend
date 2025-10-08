const express = require("express");
const router = express.Router();
const {
  createSubSubcategory,
  getSubSubcategories,
  getSubSubcategoryById,
  updateSubSubcategory,
  deleteSubSubcategory,
} = require("../controllers/subSubcategoryController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", getSubSubcategories);
router.get("/:id", getSubSubcategoryById);
router.post("/", authMiddleware, createSubSubcategory);
router.put("/:id", authMiddleware, updateSubSubcategory);
router.delete("/:id", authMiddleware, deleteSubSubcategory);

module.exports = router;