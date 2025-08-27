const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public route: Get all products
router.get('/', getProducts);

// Admin routes (authentication middleware optional)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;