import jwt from "jsonwebtoken";
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
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res
          .status(400)
          .json({ error: "Người dùng đã tồn tại, vui lòng đăng nhập" });
      }
      const newUser = await new User({
        username,
        password: hashed,
      });
      await newUser.save();

      const accessToken = jwt.sign({ newUser }, process.env.JWT_ACCESS_KEY);
      res.json(accessToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        username,
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
      const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", accessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      res.json(accessToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi máy chủ" });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).json("Đăng xuất thành công");
  },
};

export default authController;
