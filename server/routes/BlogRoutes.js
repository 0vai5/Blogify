import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import BlogController from "../controllers/BlogController.js";

const blogRouter = Router();

blogRouter.post("/createBlog", isAuthenticated, BlogController.createBlog);

export default blogRouter;