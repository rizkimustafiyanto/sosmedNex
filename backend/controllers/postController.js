const Post = require("../models/Post");
const Like = require("../models/Like");

const createPost = async (req, res) => {
  const { content, imageUrl } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.create({ userId, content, imageUrl });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

const getPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await Post.findAll();

    const processedPosts = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.count({
          where: {
            postId: post.id,
          },
        });

        const hasLiked = await Like.findOne({
          where: {
            postId: post.id,
            userId: userId,
          },
        });

        return {
          id: post.id,
          content: post.content,
          imageUrl: post.imageUrl,
          likes: likesCount,
          hasLiked: !!hasLiked,
          comments: post.comments || [],
        };
      })
    );

    res.json(processedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content, imageUrl } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.content = content || post.content;
    post.imageUrl = imageUrl || post.imageUrl;
    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
