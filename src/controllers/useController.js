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
};

export default useController;
