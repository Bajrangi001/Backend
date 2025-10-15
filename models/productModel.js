const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
    },
    thumbImages: {
      type: [String],
      default: [],
    },
    colors: {
      type: [colorSchema],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // required: [true, "Product category is required"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      // required: [true, "Product subcategory is required"],
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      dimensions: { type: String },
      seatingHeight: { type: String },
      material: { type: String },
    },
    filters: {
      color: {
        type: String,
        enum: ["purple", "green", "red", "brown"],
        default: null,
      },
      material: {
        type: String,
        enum: ["Silk", "Velvet", "Polyester"],
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
