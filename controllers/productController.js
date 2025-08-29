const Product = require('../models/productModel');

// Add product (Admin)
exports.createProduct = async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.price || !req.body.category || !req.file) {
      return res.status(400).json({ message: 'Missing required fields: name, price, category, and image' });
    }

    // Add image path to product data
    const productData = {
      ...req.body,
      image: req.file.path
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products (Public)
exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find()
      .populate('category')
    // .populate('subcategory');
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Hard delete

exports.hardDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product hard deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg:"Server Error", error: err.message });
  }
};