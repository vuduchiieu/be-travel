import { Comment } from "../models/comment.js";
import { Post } from "../models/posts.js";
import jwt from "jsonwebtoken";

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

      await Post.findByIdAndUpdate(postId, { $push: { comment } });

      const accessToken = jwt.sign({ comment }, process.env.JWT_ACCESS_KEY);

      return res.status(200).json(accessToken);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
  deleteComment: async (req, res) => {
    const postId = req.params.post;
    const authorId = req.params.author;
    const commentId = req.params.comment;

    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Bình luận không tồn tại" });
      }
      if (!postId) {
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
      if (!authorId) {
        return res.status(404).json({ message: "Tác giả không tồn tại" });
      }
      if (comment.user._id != authorId) {
        return res.status(404).json({ message: "Bạn không có quyền xoá" });
      }

      await comment.deleteOne();
      return res.status(200).json("Bình luận đã được xóa");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default commentController;
