import { Post } from "../models/posts.js";
import { Like } from "../models/like.js";

const likeController = {
  like: async (req, res) => {
    try {
      const { postId, userId } = req.params;

      if (!postId) {
        return res.status(404).json({ error: "Bài viết không tồn tại" });
      }

      if (!userId) {
        return res.status(404).json({ error: "Tài khoản không tồn tại" });
      }

      const like = new Like({
        post: postId,
        user: userId,
      });

      await like.save();

      await Post.findByIdAndUpdate(postId, { like });

      return res.status(201).json(`like bài ${postId} thành công`);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
  unlike: async (req, res) => {
    try {
      const { postId, userId, likeId } = req.params;

      const like = await Like.findById(likeId);

      if (!postId) {
        return res.status(404).json({ error: "Bài viết không tồn tại" });
      }

      if (!userId) {
        return res.status(404).json({ error: "Tài khoản không tồn tại" });
      }

      if (like.user != userId && like.post != likeId) {
        return res.status(404).json({ message: "Bạn không có quyền unlike" });
      }

      await like.deleteOne();

      return res.status(201).json(`unlike bài ${postId} thành công`);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default likeController;
