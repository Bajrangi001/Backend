const mongoose = require('mongoose');
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

});
 const ProductCategorySchema = new mongoose.Schema({
    categogryName: {
        type: String,
        required: true,
    },

 subcategories: [subcategorySchema]
},
    { timestamps: true }
); 

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);