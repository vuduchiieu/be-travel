import { Router } from "express";
import useController from "../controllers/useController.js";
import { uploader } from "../utils/uploader.js";

const userRouter = Router();

userRouter.get("/", useController.getAllUser);
userRouter.get("/:id", useController.getUser);
userRouter.put("/:id", uploader.single("images"), useController.updateUser);

export default userRouter;
