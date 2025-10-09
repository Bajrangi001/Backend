const express = require("express");
const { createEnquiry, getEnquiries } = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware"); // Updated to match file name

const router = express.Router();

// Protected POST route (assuming admin-only)
router.post("/", protect, createEnquiry);

// Protected GET route
router.get("/", protect, getEnquiries);

module.exports = router;