const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/:postId/comments", verifyToken, addComment);
router.get("/:postId/comments", verifyToken, getComments);
router.delete("/comments/:id", verifyToken, deleteComment);

module.exports = router;
