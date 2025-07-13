const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    generateBlogPost,
    generateBlogPostIdeas,
    generateBlogPostSummary
} = require("../controllers/aiController");

const router = express.Router();

// All Routes
router.post("/generate", protect, generateBlogPost);
router.post("/generate-ideas", protect, generateBlogPostIdeas);
router.post("/generate-summary", protect, generateBlogPostSummary);

module.exports = router;