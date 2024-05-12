import { Post } from "../models/posts.js";
import { cloudinary } from "../utils/uploader.js";

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, milestone, isPublic } = req.body;
      const author = req.params.id;
      const imgFile = req.files;

      const image = [];

      for (const file of imgFile) {
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString(
          "base64"
        )}`;
        const fileName = file.originalname.split(".")[0];
        const uploaded = await cloudinary.uploader.upload(dataUrl, {
          public_id: fileName,
          resource_type: "auto",
        });
        image.push({ url: uploaded.url });
      }

      const newPost = new Post({
        title,
        image,
        author,
        milestone,
        isPublic,
      });
      await newPost.save();
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: "Không thể tạo bài đăng" });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .limit()
        .populate("author")
        .populate("like")
        .populate("comment")
        .exec();
      const totalPosts = await Post.countDocuments();

      return res.status(200).json({
        data: posts,
        page,
        pageSize,
        totalPages: Math.ceil(totalPosts / pageSize),
      });
    } catch (err) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
  deletePost: async (req, res) => {
    const postId = req.params.id;
    const author = req.params.id;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
      if (!author) {
        return res.status(404).json({ message: "Tác giả không tồn tại" });
      }
      if (postId.author !== author) {
        return res.status(404).json({ message: "Bạn không có quyền xoá" });
      }

      if (post.image) {
        for (let i = 0; i < post.image.length; i++) {
          const publicId = post.image[i]._id;
          await cloudinary.uploader.destroy(publicId);
          console.log("daxoa");
        }
      }

      await post.deleteOne();
      return res.status(200).json("bài viết đã được xóa");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default postController;
