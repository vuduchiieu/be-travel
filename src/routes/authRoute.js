import { Router } from "express";
import authController from "../controllers/authController.js";
import { middlewareController } from "../controllers/middlewareController.js";

const authRouter = Router();

authRouter.post("/logingoogle", authController.loginGoogle);

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post(
  "/logout",
  middlewareController.verifyToken,
  authController.logout
);

export default authRouter;
