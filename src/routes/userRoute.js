import { Router } from "express";
import useController from "../controllers/useController.js";

const userRouter = Router();

userRouter.get("/", useController.getAllUser);
userRouter.get("/:id", useController.getUser);

export default userRouter;
