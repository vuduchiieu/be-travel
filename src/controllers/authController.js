import bcrypt from "bcrypt";

import User from "../models/user.js";

const authController = {
  loginGoogle: async (req, res) => {
    const { email, name, image, provider, providerAccountId } = req.body;
    const accoutGoogle = await User.findOne({ providerAccountId });

    if (accoutGoogle) {
      return res.status(200).json(accoutGoogle);
    }
    const newUser = await new User({
      email,
      name,
      image,
      provider,
      providerAccountId,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return res.status(404).json({
          message: "Tên người dùng, email hoặc số điện thoại chưa tồn tại",
        });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(404).json({ message: "Mật khẩu không hợp lệ" });
      }
      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
  register: async (req, res) => {
    const { password, email } = req.body;
    try {
      const user = await User.findOne({ email });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res.status(400).json({ message: "Người dùng đã tồn tại" });
      }
      const newUser = await new User({
        email,
        password: hashed,
      });

      await newUser.save();
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  },
};

export default authController;
