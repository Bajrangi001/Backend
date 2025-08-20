const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const uploadRoutes = require("./routes/uploadRoutes");
const Path = require("path");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const e = require("express");




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Default route
app.use("/users", userRoutes); 
app.use('/auth', userRoutes);
app.use('/api',uploadRoutes);


app.use('/uploads', express.static(Path.join(__dirname,'uploads')));


app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Server listen
app.listen(5000, () => {
    console.log(`Server running on port ${ 5000 }`);
});