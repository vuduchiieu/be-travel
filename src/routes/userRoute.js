import { Router } from "express";
import useController from "../controllers/useController.js";
import { uploader } from "../utils/uploader.js";

const userRouter = Router();

userRouter.get("/", useController.getAllUser);
userRouter.get("/:id", useController.getUser);
userRouter.get("/account/:email", useController.getUserByEmail);
userRouter.put("/:id", uploader.single("images"), useController.updateUser);
userRouter.delete("/:id", useController.deleteUser);

export default userRouter;
