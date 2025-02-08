import { Router } from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated.js"
import commentController from "../controllers/commentController.js";
const commentRouter = Router();

commentRouter.post("/createComment", isAuthenticated, commentController.createComment)

export default commentRouter