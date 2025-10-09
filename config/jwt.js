const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Access Token
const generateAccessToken = (admin) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env file");
  }

  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Refresh Token
const generateRefreshToken = (admin) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is missing in .env file");
  }

  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
