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
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // const user = await User.findOne({
      //   email,
      // });

      // if (email === user.email) {
      //   return res
      //     .status(400)
      //     .json({ error: "Người dùng đã tồn tại, vui lòng đăng nhập" });
      // }
      const newUser = await new User({
        username,
        password: hashed,
      });
      await newUser.save();
      res.json(email);
    } catch (error) {
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
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
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
};

export default authController;
