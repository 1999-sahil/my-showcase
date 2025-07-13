const Notes = require("../models/notes");
const Category = require("../models/category");

// @desc    Create a new note
// @route   Post /api/notes
// @access  Private (admin-only)
const createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      handwrittenNotesImages,
      category, // this will be the name, e.g., "JavaScript"
      tags,
      coverImageUrl,
      isDraft,
    } = req.body;

    // Generate slug for the note
    const noteSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Create a slug for category as well
    const categorySlug = category.toLowerCase().replace(/ /g, "-");

    // Try to find the category by slug
    let categoryDoc = await Category.findOne({ slug: categorySlug });

    // If category doesn't exist, create one
    if (!categoryDoc) {
      categoryDoc = new Category({
        name: category,
        slug: categorySlug,
      });
      await categoryDoc.save();
    }

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // Create new note
    const newNote = new Notes({
      title,
      slug: noteSlug,
      content,
      category: categoryDoc._id,
      handwrittenNotesImages,
      tags,
      coverImageUrl,
      isDraft,
      author: req.user._id,
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// @desc    Update note by id
// @route   PUT /api/notes/:id
// @access  Private (admin-only)
const updateNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found." });

    if (
      note.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note." });
    }

    const {
      title,
      content,
      handwrittenNotesImages,
      category,
      tags,
      coverImageUrl,
      isDraft,
    } = req.body;

    // Prepare updatedData object
    const updatedData = {
      title,
      content,
      handwrittenNotesImages,
      tags,
      coverImageUrl,
      isDraft,
    };

    // Update slug if title changed
    if (title) {
      updatedData.slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    // Handle category: name → slug → Category ID
    if (category) {
      const categorySlug = category.toLowerCase().replace(/ /g, "-");
      let categoryDoc = await Category.findOne({ slug: categorySlug });

      if (!categoryDoc) {
        categoryDoc = new Category({ name: category, slug: categorySlug });
        await categoryDoc.save();
      }

      updatedData.category = categoryDoc._id;
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// @desc    Delete a note by id
// @route   DELETE /api/notes/:id
// @access  Private (admin-only)
const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Post not found." });

    await note.deleteOne();
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all notes
// @route   GET /api/notes/
// @access  PUBLIC
const getAllNotes = async (req, res) => {
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
        const notes = await Notes.find(filter)
          .populate("author", "name profileImageUrl")
          .sort({ updatedAt: -1 })
          .skip(skip)
          .limit(limit);
    
        // Count totals for paginated and tab counts
        const [totalCount, allCount, publishedCount, draftCount] =
          await Promise.all([
            Notes.countDocuments(filter), // for pagination of current tab
            Notes.countDocuments(),
            Notes.countDocuments({ isDraft: false }),
            Notes.countDocuments({ isDraft: true }),
          ]);
    
        res.json({
          notes,
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

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
};
