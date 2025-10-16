const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * Middleware to protect admin-only routes.
 * Verifies JWT token and checks if the user is an admin.
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch admin from DB (excluding password)
      req.admin = await Admin.findById(decoded.id).select("-password");

      // Check if admin exists and is an admin
      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, admin not found",
        });
      }

      // Optional: Check if the user is an admin (if your Admin model has `isAdmin` field)
      if (req.admin.role !== "admin") {  // Replace "role" with your actual field (e.g., "isAdmin")
        return res.status(403).json({
          success: false,
          message: "Not authorized as admin",
        });
      }

      // Proceed to the next middleware/controller
      next();

    } catch (error) {
      // Handle specific JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired, please login again",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token, please provide a valid token",
        });
      } else {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({
          success: false,
          message: "Not authorized, token failed",
        });
      }
    }
  } else {
    // No token provided
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = { protect };
