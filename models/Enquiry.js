const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String },
    subject: { type: String, required: true},
    message: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product",}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);