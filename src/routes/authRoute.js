import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/logingoogle", authController.loginGoogle);

export default authRouter;
