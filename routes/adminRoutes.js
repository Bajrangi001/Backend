const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { generateAccessToken } = require("../config/jwt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register Route
router.post("/register", registerAdmin);

// Login Route
router.post("/login", loginAdmin);

// Refresh token endpoint
router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({ _id: decoded.id });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Example POST route
router.post('/admin', (req, res) => {
    res.send('Admin POST route working!');
});

module.exports = router;