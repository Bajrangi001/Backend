const jwt = require("jsonwebtoken");

// Access token expires in 1 hour
const generateAccessToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// Refresh token expires in 30 days
const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };