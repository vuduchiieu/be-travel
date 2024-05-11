import { Router } from "express";
import authController from "../controllers/authController.js";
import { registerValidation } from "../utils/registerValidation.js";

const authRouter = Router();

authRouter.post("/logingoogle", authController.loginGoogle);
authRouter.post("/login", authController.login);
authRouter.post("/register", registerValidation, authController.register);

export default authRouter;
