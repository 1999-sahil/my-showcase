const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true, // Markdown or rich text
    },

    handwrittenNotesImages: [{
        type: String
    }],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    tags: [
      {
        type: String,
      },
    ], // Optional, e.g., ["hooks", "array", "recursion"]

    coverImageUrl: {
      type: String,
      default: null,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // So only admins can create/update/delete
    },

    isDraft: {
      type: Boolean,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
