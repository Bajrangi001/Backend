const Enquiry = require("../models/Enquiry");
const Product = require("../models/productModel");

// Create Enquiry (User login-free)
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, productId } = req.body;

    if (!name || !email || !subject || !message || !productId) {
      return res.status(400).json({ msg: "All fields are required including productId" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(400).json({ msg: "Invalid productId" });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      subject,
      message,
      productId
    });

    await enquiry.save();
    res.status(201).json({ msg: "Enquiry submitted successfully", enquiry });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get All Enquiries (Admin)
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("productId", "name category");
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};