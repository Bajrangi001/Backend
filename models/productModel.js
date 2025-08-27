const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  price: { type: Number, required: true },
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);