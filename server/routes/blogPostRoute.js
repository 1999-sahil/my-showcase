const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  searchPosts,
  getTopPosts,
  incrementViewCount,
} = require("../controllers/blogPostController");

const router = express.Router();

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

// All Routes
router.post("/", protect, adminOnly, createPost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.delete("/:id", protect, adminOnly, deletePost);
router.put("/:id", protect, adminOnly, updatePost);
router.get("/tag/:tag", getPostsByTag);
router.get("/search", searchPosts);
router.put("/:id/view", incrementViewCount);
router.get("/trending", getTopPosts);

module.exports = router;
