import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CustomError } from "../utils/CustomError.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new CustomError(401, "You Aren't Authorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(error.status || 500, error.message));
  }
};
