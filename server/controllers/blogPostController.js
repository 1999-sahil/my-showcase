const mongoose = require("mongoose");
const BlogPost = require("../models/blogPost");

// @desc    Create a new blog post
// @route   Post /api/blogs/posts
// @access  Private (admin-only)
const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new BlogPost({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      generatedByAI,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Update an existing blog post
// @route   PUT /api/blogs/posts/:id
// @access  Private (admin-only)
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found." });

    if (
      post.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post." });
    }

    const updatedData = req.body;

    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/posts/:id
// @access  Private (admin-only)
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found." });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get blog posts by status (all/published/draft) and include counts
// @route   GET /api/blogs/posts?status=published|draft|all&page=1
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    // Determine filter for main posts response
    let filter = {};

    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    // Fetch paginated posts
    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count totals for paginated and tab counts
    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter), // for pagination of current tab
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ isDraft: false }),
        BlogPost.countDocuments({ isDraft: true }),
      ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a single blog post by slug
// @route   GET /api/blogs/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate(
      "author",
      "name profileImageUrl"
    );

    if (!post) return res.status(404).json({ message: "Post not found." });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get blog posts by tag
// @route   GET /api/blogs/posts/tag/:tag
// @access  Public
const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    const posts = await BlogPost.find({
      tags: { $regex: new RegExp(tag, "i") }, // case-insensitive, partial match
      isDraft: false,
    }).populate("author", "name profileImageUrl");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Search posts by title or content
// @route   GET /api/blogs/posts/search?q=keyword
// @access  Public
const searchPosts = async (req, res) => {
  try {
    const q = req.query.q;
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Increment post view count
// @route   PUT /api/blogs/posts/:id/view
// @access  Public
const incrementViewCount = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ message: "View count incremented" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get top trending posts
// @route   GET /api/blogs/posts/trending
// @access  Private
const getTopPosts = async (req, res) => {
  try {
    // Top performing posts
    const posts = await BlogPost.find({ isDraft: false })
      .sort({ views: -1 })
      .limit(8);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  searchPosts,
  incrementViewCount,
  getTopPosts,
};
