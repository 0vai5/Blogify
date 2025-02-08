import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  userSignInSchema,
  userSignUpSchema,
} from "../utils/UserValidationSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CustomError } from "../utils/CustomError.js";

const authController = {
  async signup(req, res) {
    try {
      const { error, value } = userSignUpSchema.validate(req.body);
      if (error) throw new CustomError(400, error.message);

      const { email, password, name } = req.body;

      const user = await User.findOne({ email });

      if (user) throw new CustomError(400, "User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserObj = {
        email,
        password: hashedPassword,
        name,
      };

      const newUser = await User.create(newUserObj);

      if (!newUser) throw new CustomError(400, "User not created");

      return ApiResponse(res, 201, "User created successfully", newUser);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status, error.message));
    }
  },
  async signin(req, res) {
    try {
      const { error, value } = userSignInSchema.validate(req.body);

      if (error) throw new CustomError(400, error.message);

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) throw new CustomError(404, "User not Exists");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new CustomError(400, "Invalid credentials");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
        httpOnly: true,
      });

      return res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, "User logged in", user, token));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status, error.message));
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("token", { path: "/" });

      return res.status(200).json(new ApiResponse(200, "User logged out"));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status, error.message));
    }
  },
  async getCurrentUser(req, res) {
    try {
      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) throw new CustomError(404, "User not found");

      return res.status(200).json(new ApiResponse(200, "User found", user));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status, error.message));
    }
  },
};

export default authController;
