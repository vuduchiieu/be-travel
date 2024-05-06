import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res.status(400).json({ error: "Người dùng đã tồn tại" });
      }
      const newUser = await new User({
        username,
        password: hashed,
      });
      await newUser.save();

      const accessToken = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_ACCESS_KEY
      );
      res.json(accessToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!user) {
        res.status(404).json("username hoặc email không hợp lệ!");
        return;
      }
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        res.status(404).json("password không hợp lệ!");
      }
      const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_KEY);
      res.json(accessToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
