import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import BlogController from "../controllers/BlogController.js";

const blogRouter = Router();

blogRouter.post("/createBlog", isAuthenticated, BlogController.createBlog);
blogRouter.get("/getBlogs", BlogController.getBlogs);
blogRouter.get("/getBlog/:id", BlogController.getBlog);

export default blogRouter;
