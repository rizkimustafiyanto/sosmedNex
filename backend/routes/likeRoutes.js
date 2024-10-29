const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addLikes,
  getLikes,
  deleteLikes,
} = require("../controllers/likeController");
const router = express.Router();

router.post("/:postId/like", verifyToken, addLikes);
router.get("/:postId/like", verifyToken, getLikes);
router.delete("/:postId/like", verifyToken, deleteLikes);

module.exports = router;
