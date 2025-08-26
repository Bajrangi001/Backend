const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // Debugging line

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token); // Debugging line

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging line
    req.user = decoded; // optional: user info
    next(); // ✅ must call next()
  } catch (error) {
    console.log("JWT verify error:",error.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};