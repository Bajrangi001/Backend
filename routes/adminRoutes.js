// routes/adminRoutes.js
const express = require("express");
const {
  loginAdmin,
  changePassword
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../config/jwt");

const router = express.Router();

// 🟢 Admin Login
router.post("/login", loginAdmin);

// 🟢 Change Password (JWT Protected)
router.post("/change-password", protect, changePassword);

// 🟢 Refresh Token Endpoint (optional)
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

// 🧪 Optional: test route
router.get("/", (req, res) => {
  res.send("✅ Admin routes working!");
});

module.exports = router;
