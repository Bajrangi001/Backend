const mongoose = require("mongoose");

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
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    image: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Product subcategory is required"],
    },
    filters: {
      color: {
        type: String,
        enum: ["purple", "green", "red", "brown"], // Based on the color circles
        default: null,
      },
      material: {
        type: String,
        enum: ["Silk", "Velvet", "Polyester"], // Based on the material dropdown
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);