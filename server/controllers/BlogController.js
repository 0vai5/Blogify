import Blog from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CustomError } from "../utils/CustomError.js";
import User from "../models/user.model.js";
import { fileUploadToCloudinary } from "../utils/cloudinary.js";

const blogController = {
  async createBlog(req, res) {
    try {
      const { title, content } = req.body;
      const file = req.file;

      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) throw new CustomError(404, "User not found");

      const fileLocalPath = file.path;

      const { url } = await fileUploadToCloudinary(fileLocalPath);

      const blog = await Blog.create({
        title,
        content,
        imageURL: url,
        userID: user._id,
      });

      if (!blog) throw new CustomError(500, "Blog not created");

      return res.status(201).json(new ApiResponse(201, "Blog created", blog));
    } catch (error) {
      return res
        .status(error.status)
        .json(new ApiResponse(error.status, error.message));
    }
  },
  async getBlogs(req, res) {
    try {
      const blogs = await Blog.aggregate([
        {
          $lookup: {
            from: "BlogUser",
            localField: "userID",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            imageURL: 1,
            createdAt: 1,
            updatedAt: 1,
            "user.name": 1,
            "user.email": 1,
          },
        },
      ]);

      return res.status(200).json(new ApiResponse(200, "Blogs fetched", blogs));
    } catch (error) {
      return res
        .status(error.status)
        .json(new ApiResponse(error.status, error.message));
    }
  },
  async getBlog(req, res) {
    try {
      const { id } = req.params;

      const blog = await Blog.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "BlogUser",
            localField: "userID",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            imageURL: 1,
            createdAt: 1,
            updatedAt: 1,
            "user.name": 1,
            "user.email": 1,
          },
        },
      ]);

      if (!blog) throw new CustomError(404, "Blog not found");

      return res.status(200).json(new ApiResponse(200, "Blog fetched", blog));
    } catch (error) {
      return res
        .status(error.status)
        .json(new ApiResponse(error.status, error.message));
    }
  },
};

export default blogController;
