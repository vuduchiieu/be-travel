import { Post } from "../models/posts.js";
import { cloudinary } from "../utils/uploader.js";
import User from "../models/user.js";

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

      res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Không thể tạo bài đăng" });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const posts = await Post.find({}).skip(skip).limit(limit).exec();
      const totalPosts = await Post.countDocuments();

      const AllPosts = [];

      for (const post of posts) {
        const author = await User.findById(post.author);
        const postWithAuthor = {
          post: post,
          author: {
            image: author.image,
            name: author.name,
            email: author.email,
          },
        };
        AllPosts.push(postWithAuthor);
      }

      res.status(200).json({
        data: AllPosts,
        page,
        pageSize,
        totalPages: Math.ceil(totalPosts / pageSize),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },
};

export default postController;
