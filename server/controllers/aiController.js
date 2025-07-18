const { GoogleGenAI } = require("@google/genai");
const {
    blogPostIdeasPrompt,
    blogSumaryPrompt
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate blog content from title
// @route   POST /api/ai/generate
// @access  Private (Admin-only)
const generateBlogPost = async (req, res) => {
    try {
        const { title, tone } = req.body;

        if (!title || !tone) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const prompt = `Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheadings, code examples if relevant, and a conclusion.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let rawText = response.text;
        res.status(200).json(rawText);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate blog post.", error: error.message });
    }
};

// @desc    Generate blog post ideas from title
// @route   POST /api/ai/generate-ideas
// @access  Private (Admin-only)
const generateBlogPostIdeas = async (req, res) => {
    try {
        const { topics } = req.body;

        if (!topics) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const prompt = blogPostIdeasPrompt(topics);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ``` json
            .replace(/```$/, "")    // remove ending ```
            .trim(); // remove extra spaces

        // Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate blog post ideas.", error: error.message });
    }
};

// @desc    Generate blog post summary
// @route   POST /api/ai/generate-summary
// @access  Private (Admin-only)
const generateBlogPostSummary = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const prompt = blogSumaryPrompt(content);

        const response = await ai.models.generateContent({
            models: "gemini-2.5-flash",
            contents: prompt
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ``` json
            .replace(/```$/, "")    // remove ending ```
            .trim(); // remove extra spaces

        // Now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate blog post summary.", error: error.message });
    }
};

module.exports = { generateBlogPost, generateBlogPostIdeas, generateBlogPostSummary };