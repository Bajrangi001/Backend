const Enquiry = require("../models/Enquiry");

// Create Enquiry (User login-free)
exports.createEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message, productId } = req.body;

    if (!firstName || !lastName || !email || !phone || !subject || !message || !productId) {
      return res.status(400).json({ msg: "All fields are required including productId" });
    }

    let valideProductId = null;
    if(productId){
      const productExists = await Product.findById(productId);
      if(!productExists) {
        return res.status(400).json({ msg: "Invalid productId" });
      }
      valideProductId = productId;
    }

    const enquiry = new Enquiry({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      productId
    });

    await enquiry.save();
    res.status(201).json({ msg: "Enquiry submitted successfully", enquiry });
  } catch (err) {
    console.error("Error in createEnquiry:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Enquiries (Admin)
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("productId", "name category");
    res.json(enquiries);
  } catch (err) {
    console.error("Error in getEnquiries:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};