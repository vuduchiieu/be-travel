import { Router } from "express";
import likeController from "../controllers/likeController.js";

const likeRoute = Router();

likeRoute.post("/:postId/:userId", likeController.like);
likeRoute.delete("/:postId/:userId/:likeId", likeController.unlike);

export default likeRoute;
