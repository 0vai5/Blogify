import { Router } from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js"
import userController from "../controllers/userController.js";
const userRouter = Router();

userRouter.post("/signup", isLoggedIn, userController.signup);
userRouter.post("/signin", isLoggedIn, userController.signin);
userRouter.post("/logout", isAuthenticated, userController.logout);
userRouter.get("/getCurrentUser", isAuthenticated, userController.getCurrentUser)


export default userRouter;