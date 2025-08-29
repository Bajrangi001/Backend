const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const { hardDeleteProduct } = require('../controllers/productController');

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public route: Get all products
router.get('/', getProducts);

// Admin routes (authentication middleware optional)
router.post('/',upload.single('image'), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Hard delete
router.delete('/hard/:id', hardDeleteProduct);

module.exports = router;