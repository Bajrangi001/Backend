const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();

// Database connect
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/enquiry", require("./routes/enquiryRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("server is running...");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});