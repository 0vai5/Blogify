import { ApiResponse } from "../utils/ApiResponse.js";
import { CustomError } from "../utils/CustomError.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (token) throw new CustomError(200, "You are already authorized");
    next();
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiResponse(error.status || 500, error.message));
  }
};
