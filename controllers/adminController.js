const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerAdmin = async(req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

const newadmin = new Admin({
      name,
      email,
      password
    });
    console.log(newadmin)
    await newadmin.save();
   
    res.status(200).json({
        message:"Insert addmin successfully",
        newadmin
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};