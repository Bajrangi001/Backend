const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// Register Route
router.post("/register", registerAdmin);

// Login Route
router.post("/login", loginAdmin);

module.exports = router;