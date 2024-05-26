import { Router } from "express";
import followerController from "../controllers/followerController.js";

const followerRoute = Router();

followerRoute.post(
  "/:userIdFollowing/:userIdFollower",
  followerController.followUser
);

export default followerRoute;
