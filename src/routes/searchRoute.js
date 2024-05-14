import { Router } from "express";
import useController from "../controllers/useController.js";

const searchRouter = Router();

searchRouter.get("/", useController.searchUser);

export default searchRouter;
