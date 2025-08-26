const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
// const SECRET = process.env.JWT_SECRET;
const authMiddleware = require("../middleware/authMiddleware");

const SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    console.error("Error in registerAdmin:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id:admin._id }, SECRET, { expiresIn: "1h" });

    res.json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (err) {
    console.error("Error in loginAdmin:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};