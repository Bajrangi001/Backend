const express = require("express");
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Public route (if needed, otherwise use protect)
router.post("/", createEnquiry);
// Protected routes (Admin)
router.get("/", protect, getEnquiries);
router.get("/:id", protect, getEnquiryById);
router.put("/:id", protect, updateEnquiry);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;
