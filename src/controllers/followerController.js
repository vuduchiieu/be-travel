import { User } from "../models/user.js";

const followerController = {
  followUser: async (req, res) => {
    try {
      const { userIdFollowing, userIdFollower } = req.params;
      const following = await User.findById(userIdFollowing);
      const follower = await User.findById(userIdFollower);

      console.log("follower", follower);

      if (!following || !follower) {
        throw new Error("Không tìm thấy người dùng");
      }

      if (follower.follower.includes(userIdFollowing)) {
        throw new Error("Người dùng đã được theo dõi trước đó");
      }

      following.follower.watching.push(userIdFollower);
      follower.follower.followers.push(userIdFollowing);

      await following.save();
      await follower.save();

      return { success: true, message: "Đã theo dõi người dùng thành công" };
    } catch (error) {
      console.log(error);
    }
  },
};

export default followerController;
