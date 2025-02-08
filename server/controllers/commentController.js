import Comment from "../models/comment.model";
import Blog from "../models/blog.model";
import User from "../models/user.model";
import { createCommentSchema } from "../utils/CommentValidationSchema";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomError } from "../utils/CustomError";

const commentController = {
  async createComment(req, res) {
    try {
      const { id } = req.user;

      const user = await User.findById(id);

      const { error, value } = createCommentSchema.validate(req.body);

      if (error) throw new CustomError(400, error.message);

      const { comment, blogId } = req.body;

      const blog = await Blog.findById(blogId);

      if (!blog) throw new CustomError(404, "Blog not found");

      const newComment = await Comment.create({
        comment,
        blog: blog._id,
        user: user._id,
      });

      return res
        .status(201)
        .json(new ApiResponse(201, "Comment created successfully", newComment));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status, error.message));
    }
  },
};

export default commentController;
