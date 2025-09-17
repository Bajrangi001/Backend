const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Ensure this matches the model name in Category.js
      required: [true, "Category is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Ensure this matches the model name in Product.js
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subcategorySchema); // Ensure this matches the ref in other models
