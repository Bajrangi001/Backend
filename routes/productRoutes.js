const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsBySubCategory,
} = require("../controllers/productController");

router.post("/", upload.fields([{ name: "image", maxCount: 1 }, { name: "thumbImages", maxCount: 4 }]), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/subcategory/:subCategoryid", getProductsBySubCategory);
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "thumbImages", maxCount: 4 }]), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
