const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createProject,
  getAllProjects,
  getProjectBySlug,
  deleteProject,
  updateProject,
  getProjectsByTag,
  searchProjects,
  incrementProjectViewCount,
  getTopProjects,
} = require("../controllers/projectDocController");

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
router.post("/", protect, adminOnly, createProject);
router.get("/", getAllProjects);
router.get("/slug/:slug", getProjectBySlug);
router.delete("/:id", protect, adminOnly, deleteProject);
router.put("/:id", protect, adminOnly, updateProject);
router.get("/tag/:tag", getProjectsByTag);
router.get("/search", searchProjects);
router.put("/:id/view", incrementProjectViewCount);
router.get("/trending", getTopProjects);

module.exports = router;
