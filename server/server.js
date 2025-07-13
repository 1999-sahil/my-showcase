require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoute = require("./routes/authRoute");
const blogPostRoute = require("./routes/blogPostRoute");
const projectDocRoute = require("./routes/projectDocRoute");
const notesRoute = require("./routes/notesRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const aiRoute = require("./routes/aiRoute");

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
app.use("/api/projects", projectDocRoute);
app.use("/api/notes", notesRoute);
app.use("/api/dashboard-summary", dashboardRoute);
app.use("/api/ai", aiRoute);


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
