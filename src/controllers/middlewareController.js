import jwt from "jsonwebtoken";

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.header.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token đã hết hạn");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("Bạn chưa đăng nhập");
    }
  },
};

export { middlewareController };
