import { Router } from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js"
import authController from "../controllers/authController.js";
const userRouter = Router();

userRouter.post("/signup", isLoggedIn, authController.signup);
userRouter.post("/signin", isLoggedIn, authController.signin);
userRouter.post("/logout", isAuthenticated, authController.logout);


export default userRouter;