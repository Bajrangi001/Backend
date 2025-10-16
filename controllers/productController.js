const Product = require("../models/productModel");
const Subcategory = require("../models/Subcategory");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (optional, if you need user info)
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Create a new product (protected)
const createProduct = async (req, res) => {
  try {
    const { name, description, category, subcategory, filters, colors, features, specifications } = req.body;
    let thumbImages = [];

    if (req.files && req.files.thumbImages) {
      thumbImages = req.files.thumbImages.map(file => file.path);
    }

    const productData = {
      name,
      description,
      category,
      subcategory,
      filters: filters ? JSON.parse(filters) : {},
      colors: colors ? JSON.parse(colors) : [],
      features: features ? JSON.parse(features) : [],
      specifications: specifications ? JSON.parse(specifications) : {},
    };

    if (req.files && req.files.image && req.files.image[0]) {
      productData.image = req.files.image[0].path;
    }

    if (thumbImages.length > 0) {
      productData.thumbImages = thumbImages;
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

// Get all products, optionally filtered by subcategory or filters (unprotected)
const getProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.subcategoryId) {
      query.subcategory = req.query.subcategoryId;
    }
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

// Get products by subcategory (protected)
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

// Get a single product by ID (unprotected)
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

// Update a product (protected)
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, subcategory, filters, colors, features, specifications } = req.body;
    let thumbImages = [];

    if (req.files && req.files.thumbImages) {
      thumbImages = req.files.thumbImages.map(file => file.path);
    }

    const productData = {
      name,
      description,
      category,
      subcategory,
      filters: filters ? JSON.parse(filters) : {},
      colors: colors ? JSON.parse(colors) : [],
      features: features ? JSON.parse(features) : [],
      specifications: specifications ? JSON.parse(specifications) : {},
    };

    if (req.files && req.files.image && req.files.image[0]) {
      productData.image = req.files.image[0].path;
    }

    if (thumbImages.length > 0) {
      productData.thumbImages = thumbImages;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (protected)
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
  createProduct: [protect, createProduct],
  getProducts,
  getProductById,
  updateProduct: [protect, updateProduct],
  getProductsBySubCategory: [protect, getProductsBySubCategory],
  deleteProduct: [protect, deleteProduct],
};