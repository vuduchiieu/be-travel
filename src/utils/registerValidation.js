export const registerValidation = async (req, res, next) => {
  if (!req.body.email) return res.status(404).json("email là bắt buộc!");
  if (!req.body.password) return res.status(404).json("pasword là bắt buộc!");
  next();
};
