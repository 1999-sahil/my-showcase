const BlogPost = require("../models/blogPost");
const ProjectDocs = require("../models/projectDocs");
const Notes = require("../models/notes");

// @desc    Dashboard summary
// @route   POST /api/dashboard-summary
// @access Private (Admin-only)
const getDashboardSummary = async (req, res) => {
  try {
    // Basic counts for blogs
    const [totalPosts, drafts, published, aiGenerated] = await Promise.all([
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ isDraft: true }),
      BlogPost.countDocuments({ isDraft: false }),
      BlogPost.countDocuments({ generatedByAI: true }),
    ]);

    // Basic counts for projects
    const [totalProjects, draftProjects, publishedProjects] = await Promise.all(
      [
        ProjectDocs.countDocuments(),
        ProjectDocs.countDocuments({ isDraft: true }),
        ProjectDocs.countDocuments({ isDraft: false }),
      ]
    );

    // Basic counts for notes
    const [totalNotes, draftNotes, publishedNotes] = await Promise.all([
      Notes.countDocuments(),
      Notes.countDocuments({ isDraft: true }),
      Notes.countDocuments({ isDraft: false }),
    ]);

    const totalViewsAgg = await BlogPost.aggregate([
      { $match: { views: { $exists: true } } },
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]);

    const totalViews = totalViewsAgg[0]?.total || 0;

    // Top performing blogs
    const topPosts = await BlogPost.find({ isDraft: false })
      .select("title coverImageUrl views")
      .sort({ views: -1 })
      .limit(5);

    // Top performing projects
    const topProjects = await ProjectDocs.find({ isDraft: false })
      .select("title coverImageUrl views")
      .sort({ views: -1 })
      .limit(5);

    // Tag usage aggregation
    const tagUsage = await BlogPost.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { tag: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    // Tech usage aggregation
    const techUsageProjects = await ProjectDocs.aggregate([
      { $unwind: "$techStack" },
      { $group: { _id: "$techStack", count: { $sum: 1 } } },
      { $project: { technology: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    // Categories usage aggregation
    const categoryUsageNotes = await Notes.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", // collection name in MongoDB (should be lowercase plural)
          localField: "_id",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          count: 1,
          category: {
            name: "$categoryData.name",
            slug: "$categoryData.slug",
          },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      stats: {
        totalPosts,
        drafts,
        published,
        totalViews,
        aiGenerated,
        totalProjects,
        draftProjects,
        publishedProjects,
        totalNotes,
        draftNotes,
        publishedNotes,
      },
      topPosts,
      topProjects,
      tagUsage,
      techUsageProjects,
      categoryUsageNotes,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard summary." });
  }
};

module.exports = { getDashboardSummary };
