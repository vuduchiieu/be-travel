import { Router } from "express";
import { middlewareController } from "../controllers/middlewareController.js";
import postController from "../controllers/postController.js";
import { uploader } from "../utils/uploader.js";

const postRoute = Router();

postRoute.post("/:id", uploader.array("images", 5), postController.createPost);
postRoute.get("/", postController.getAllPosts);

export default postRoute;
