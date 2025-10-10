const Product = require("../models/productModel");
const Subcategory = require("../models/Subcategory");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, category, subcategory, filters } = req.body;
    if (!name || !category || !subcategory) {
      return res
        .status(400)
        .json({
          message: "Name, category, and subcategory are required",
        });
    }

    const productData = { name, description, category, subcategory };
    if (req.file) {
      productData.image = req.file.path;
    }
    if (filters && (filters.color || filters.material)) {
      productData.filters = filters;
    }

    const product = new Product(productData);
    await product.save();

    // Add product to the subcategory's products array
    await Subcategory.findByIdAndUpdate(subcategory, {
      $push: { products: product._id },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products, optionally filtered by subcategory or filters
const getProducts = async (req, res) => {
  try {
    let query = {};

    // Filter by subcategory if provided
    if (req.query.subcategoryId) {
      query.subcategory = req.query.subcategoryId;
    }

    // Filter by color or material if provided
    if (req.query.color) {
      query["filters.color"] = req.query.color;
    }
    if (req.query.material) {
      query["filters.material"] = req.query.material;
    }

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by subcategory
const getProductsBySubCategory = async (req, res) => {
  try {
    const { subcategoryid } = req.params;
    const products = await Product.find({ subcategory: subcategoryid });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for the subcategory" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, subcategory, filters } = req.body;
    const productData = { name, description, category, subcategory };
    if (req.file) {
      productData.image = req.file.path;
    }
    if (filters && (filters.color || filters.material)) {
      productData.filters = filters;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove product from the subcategory's products array
    await Subcategory.findByIdAndUpdate(product.subcategory, {
      $pull: { products: product._id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  getProductsBySubCategory,
  deleteProduct,
};