import { Router } from "express";
import useController from "../controllers/useController.js";

const userRouter = Router();

userRouter.get("/", useController.getAllUser);

export default userRouter;
