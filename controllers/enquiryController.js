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
      productId,
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

// Get Single Enquiry by ID (Admin)
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate("productId", "name category");
    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update Enquiry (Admin)
exports.updateEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, productId } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry not found" });
    }
    if (productId) {
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(400).json({ msg: "Invalid productId" });
      }
    }
    enquiry.name = name || enquiry.name;
    enquiry.email = email || enquiry.email;
    enquiry.phone = phone || enquiry.phone;
    enquiry.subject = subject || enquiry.subject;
    enquiry.message = message || enquiry.message;
    enquiry.productId = productId || enquiry.productId;
    await enquiry.save();
    res.json({ msg: "Enquiry updated successfully", enquiry });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Delete Enquiry (Admin)
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry not found" });
    }
    res.json({ msg: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
