const mongoose = require("mongoose");

const ProjectDocSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true }, //markdown
  isDraft: { type: Boolean, default: 0 },
  coverImageUrl: { type: String, default: null },
  projectImages: [{ type: String }],
  liveUrl: { type: String, default: null },
  repoUrl: { type: String, default: null },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  techStack: [{ type: String }], // e.g., ["React", "Node.js", "MongoDB"]

  projectStructure: [{ type: String }], // e.g., ["client/", "server/", "models/"]

  features: [{ type: String }],

  apiDocs: [{
    method: { type: String },           // GET, POST, etc.
    endpoint: { type: String },         // /api/posts/:id
    description: { type: String },
    authRequired: { type: Boolean },
    requestExample: { type: Object },   // JSON example
    responseExample: { type: Object }   // JSON example
  }],

  authentication: {
    method: { type: String },           // e.g., "JWT", "OAuth", "Clerk"
    protectedRoutes: [{ type: String }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("ProjectDoc", ProjectDocSchema);
