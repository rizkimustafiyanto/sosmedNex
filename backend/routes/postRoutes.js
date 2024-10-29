const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPosts);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
