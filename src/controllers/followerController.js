import { User } from "../models/user.js";

const followerController = {
  followUser: async (req, res) => {
    try {
      const { userIdFollowing, userIdFollower } = req.params;
      if (!userIdFollowing || !userIdFollower) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const user = await User.findById(userIdFollowing);

      if (user.following.includes(userIdFollower)) {
        await User.findByIdAndUpdate(userIdFollowing, {
          $pull: { following: userIdFollower },
        });
        await User.findByIdAndUpdate(userIdFollower, {
          $pull: { followers: userIdFollowing },
        });
        return res.status(200).json({ message: "Đã bỏ theo dõi" });
      }

      await User.findByIdAndUpdate(userIdFollowing, {
        $push: { following: userIdFollower },
      });
      await User.findByIdAndUpdate(userIdFollower, {
        $push: { followers: userIdFollowing },
      });

      return res.status(201).json({ message: "Đã theo dõi" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default followerController;
