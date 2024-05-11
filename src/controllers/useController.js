import User from "../models/user.js";
import { cloudinary } from "../utils/uploader.js";

const useController = {
  getAllUser: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const users = await User.find({})
        .skip(skip)
        .limit(limit)
        .select("-password")
        .exec();
      const totalUsers = await User.countDocuments();
      res.status(200).json({
        data: users,
        page,
        pageSize,
        totalPages: Math.ceil(totalUsers / pageSize),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
  },
  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findOne({ providerAccountId: id });
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error while fetching user:", error);
      return res
        .status(500)
        .json({ error: "Có lỗi xảy ra khi tìm kiếm người dùng" });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const file = req.file;
    const { email, story, name } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      if (file) {
        if (user.image) {
          const publicId = user.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
          console.log("daxoas");
        }
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString(
          "base64"
        )}`;

        const fileName = file.originalname.split(".")[0];

        const uploaded = await cloudinary.uploader.upload(dataUrl, {
          public_id: fileName,
          resource_type: "auto",
        });
        user.image = uploaded.url;
      }
      if (story) {
        user.story = story;
      }
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default useController;
