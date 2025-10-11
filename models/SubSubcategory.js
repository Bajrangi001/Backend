const mongoose = require("mongoose");

const subSubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sub-subcategory name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    Subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Parent subcategory is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubSubcategory", subSubcategorySchema);