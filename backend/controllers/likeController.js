const Like = require("../models/Like");

const addLikes = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const [like, created] = await Like.findOrCreate({
      where: { postId, userId },
    });

    if (!created) {
      return res.status(400).json({ message: "Already liked" });
    }

    res.status(201).json({ message: "Like added successfully", like });
  } catch (error) {
    res.status(500).json({ message: "Error adding like", error });
  }
};

const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Like.findAll({
      where: { postId },
      order: [["createdAt", "ASC"]],
    });
    res.json({ likes, count: likes.length });
  } catch (error) {
    res.status(500).json({ message: "Error fetching likes", error });
  }
};

const deleteLikes = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const like = await Like.findOne({ where: { postId, userId } });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await like.destroy();
    res.json({ message: "Like deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting like", error });
  }
};

module.exports = { addLikes, getLikes, deleteLikes };
