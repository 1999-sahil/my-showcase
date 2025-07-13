const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { 
    createNote,
    updateNote,
    deleteNote,
    getAllNotes,
} = require("../controllers/notesController");

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
router.post("/", protect, adminOnly, createNote);   // create new note
router.put("/:id", protect, adminOnly, updateNote); // update note by id
router.delete("/:id", protect, adminOnly, deleteNote);  // delete note by id
router.get("/", getAllNotes); // get all notes


module.exports = router;