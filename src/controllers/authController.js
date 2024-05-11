import bcrypt from "bcrypt";

import User from "../models/user.js";

const authController = {
  loginGoogle: async (req, res) => {
    const { email, name, image, provider, providerAccountId } = req.body;
    const accoutGoogle = await User.findOne({ providerAccountId });

    if (accoutGoogle) {
      return res.json(accoutGoogle);
    }
    const newUser = await new User({
      email,
      name,
      image,
      provider,
      providerAccountId,
    });
    await newUser.save();
    res.json(newUser);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        res
          .status(404)
          .json("Tên người dùng, email hoặc số điện thoại chưa tồn tại");
        return;
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        res.status(404).json("Mật khẩu không hợp lệ");
        return;
      }
      user.password = undefined;
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
  register: async (req, res) => {
    const { password, email } = req.body;
    try {
      const user = await User.findOne({ email });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res.status(400).json({ error: "Người dùng đã tồn tại" });
      }
      const newUser = await new User({
        email,
        password: hashed,
      });
      await newUser.save();

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
