const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    title: {
         type: String, 
         required: true 
        },
    description: {
         type: String,
         required: true 
        },
    fileName: {
         type: String, 
         required: true 
        },
    filePath: { 
        type: String, 
        required: true 
    },
    createdAt: {
         type: Date, 
         default: Date.now 
        }
});

module.exports = mongoose.model("Upload", uploadSchema);