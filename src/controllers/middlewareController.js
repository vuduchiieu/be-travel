import jwt from "jsonwebtoken";

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.header.token;
    if (!token) {
      return res.status(401).json({ error: "Token không được cung cấp" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: "Token không hợp lệ" });
    }
  },
};

export { middlewareController };
