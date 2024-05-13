import { Router } from "express";
import commentController from "../controllers/commentController.js";

const commentRoute = Router();

commentRoute.post("/:postId/:userId", commentController.createComment);
commentRoute.delete("/:post/:author/:comment", commentController.deleteComment);

export default commentRoute;
