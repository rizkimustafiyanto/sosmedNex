const Comment = require("../models/Comment");

// Menambahkan komentar
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({ postId, userId, content });
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Mendapatkan komentar berdasarkan postId
const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "ASC"]], // Mengurutkan berdasarkan waktu pembuatan
    });
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// Menghapus komentar
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = { addComment, getComments, deleteComment };
