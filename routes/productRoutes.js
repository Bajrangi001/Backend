const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const {
  createProduct,
  getProductsBySubCategory,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Use multer for file uploads
router.post("/", upload.single('image'), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/subcategory/:subCategoryid", getProductsBySubCategory);
router.put("/:id", upload.single('image'), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
