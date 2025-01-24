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
      return ApiResponse(res, error.statusCode || 500, error.message);
    }
  },
  async signin(req, res) {},
  async logout(req, res) {},
};

export default authController;
