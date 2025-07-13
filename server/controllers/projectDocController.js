const projectDocs = require("../models/projectDocs");
const ProjectDoc = require("../models/projectDocs");

// @desc    Create a new project
// @route   Post /api/projects
// @access  Private (admin-only)
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      shortDescription,
      coverImageUrl,
      content,
      isDraft,
      projectImages,
      liveUrl,
      repoUrl,
      techStack,
      projectStructure,
      features,
      apiDocs,
      authentication,
    } = req.body;

    const slug = projectName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newProject = new ProjectDoc({
      slug,
      projectName,
      shortDescription,
      coverImageUrl,
      content,
      isDraft,
      projectImages,
      liveUrl,
      repoUrl,
      techStack,
      projectStructure,
      features,
      apiDocs,
      authentication,
      author: req.user._id,
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Update an existing project
// @route   PUT /api/projects/:id
// @access  Private (admin-only)
const updateProject = async (req, res) => {
  try {
    const project = await ProjectDoc.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found." });

    if (
      project.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this project." });
    }

    const updatedData = req.body;

    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const updatedProject = await projectDocs.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Delete project by id
// @route   DELETE /api/projects/:id
// @access  Private (admin-only)
const deleteProject = async (req, res) => {
  try {
    const project = await ProjectDoc.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Project not found." });

    await project.deleteOne();
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Get project by status (all/published/draft) and include counts
// @route   GET /api/projects?status=published|draft|all&page=1
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    // Determine filter for main projects response
    let filter = {};

    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    // Fetch paginated projects
    const projects = await ProjectDoc.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count totals for paginated and tab counts
    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        ProjectDoc.countDocuments(filter),
        ProjectDoc.countDocuments(),
        ProjectDoc.countDocuments({ isDraft: false }),
        ProjectDoc.countDocuments({ isDraft: true }),
      ]);

    res.json({
      projects,
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
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Get a single project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const project = await ProjectDoc.findOne({
      slug: req.params.slug,
    }).populate("author", "name profileImageUrl");

    if (!project) return res.status(404).json({ message: "Post not found." });

    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Get projects by techstack
// @route   GET /api/projects/tag/:tag
// @access  Public
const getProjectsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    const projects = await ProjectDoc.find({
      techStack: { $regex: new RegExp(tag, "i") }, // case-insensitive, partial match
      isDraft: false,
    }).populate("author", "name profileImageUrl");

    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Search projects by title or content
// @route   GET /api/projects/search?q=keyword
// @access  Public
const searchProjects = async (req, res) => {
  try {
    const q = req.query.q;
    const projects = await ProjectDoc.find({
      isDraft: false,
      $or: [
        { projectName: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");

    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Increment project view count
// @route   PUT /api/projects/:id/view
// @access  Public
const incrementProjectViewCount = async (req, res) => {
  try {
    await ProjectDoc.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ message: "Project view count incremented" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// @desc    Get top trending/latest projects
// @route   GET /api/projects/trending
// @access  Private
const getTopProjects = async (req, res) => {
  try {
    // Top performing posts
    const projects = await ProjectDoc.find({ isDraft: false })
      .sort({ views: -1 })
      .limit(8);

    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectBySlug,
  getProjectsByTag,
  searchProjects,
  incrementProjectViewCount,
  getTopProjects,
};
