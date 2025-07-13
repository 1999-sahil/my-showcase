const { GoogleGenAI } = require("@google/genai");
const {
    blogPostIdeasPrompt,
    blogSumaryPrompt
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate blog content from title
// @route   POST /api/ai/generate
// @access  Private (Admin-only)
const generateBlogPost = async (req, res) => {};

// @desc    Generate blog post ideas from title
// @route   POST /api/ai/generate-ideas
// @access  Private (Admin-only)
const generateBlogPostIdeas = async (req, res) => {};

// @desc    Generate blog post summary
// @route   POST /api/ai/generate-summary
// @access  Private (Admin-only)
const generateBlogPostSummary = async (req, res) => {};

module.exports = { generateBlogPost, generateBlogPostIdeas, generateBlogPostSummary };