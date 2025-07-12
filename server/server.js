require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoute = require("./routes/authRoute");
const blogPostRoute = require("./routes/blogPostRoute");

const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/blogs/posts", blogPostRoute);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
