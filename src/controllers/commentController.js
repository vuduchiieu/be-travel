import { Comment } from "../models/comment.js";
import { Post } from "../models/posts.js";

const commentController = {
  createComment: async (req, res) => {
    try {
      const { content } = req.body;
      const { postId, userId } = req.params;

      if (!postId) {
        return res.status(404).json({ error: "Bài viết không tồn tại" });
      }

      if (!userId) {
        return res.status(404).json({ error: "Tài khoản không tồn tại" });
      }

      const comment = new Comment({
        content,
        post: postId,
        user: userId,
      });

      await comment.save();

      await Post.findByIdAndUpdate(postId, { comment });

      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default commentController;
