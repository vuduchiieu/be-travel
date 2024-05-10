import User from "../models/user.js";

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
};

export default useController;
