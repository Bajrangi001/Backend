const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const adminRoutes= require("./routes/adminRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const {productRoutes} = require("./routes/productRoutes");

dotenv.config();
const app = express();

// Database connect
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", adminRoutes); 
app.use("/api/products", require("./routes/productRoutes.js"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/enquiry", require("./routes/enquiryRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});