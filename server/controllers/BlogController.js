const BlogModel = require('../models/blog.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const CreateBlog = async (req, res) => {
    try {
        const { title, content, imageURL } = req.body;

        // Validate required fields
        if (!title || !content || !imageURL) {
            return res.status(400).json({
                status: 400,
                message: 'All fields are required.'
            });
        }

        // Check for authorization token in cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Authentication required. Please log in.'
            });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid token. Please log in again.'
            });
        }

        // Retrieve user from database
        const user = await UserModel.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found. Please log in again.'
            });
        }

        // Create and save the blog post
        const blog = await BlogModel.create({
            title,
            content,
            imageURL,
            User: user._id
        });

        // Associate the blog with the user
        user.blogs.push(blog._id);
        await user.save();

        return res.status(201).json({
            status: 201,
            message: 'Blog created successfully.',
            blog
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({
            status: 500,
            message: 'An internal server error occurred. Please try again later.'
        });
    }
};

const DeleteBlog = async (req, res) => {
    try {
        const { BlogID } = await req.body;
        if (!BlogID) {
            return res.json({
                status: 304,
                message: "Please Provide the Blog ID"
            })
        }

        const blog = await BlogModel.findById(BlogID);
        if (!blog) {
            return res.json({
                status: 304,
                message: "Blog Not Found"
            })
        }

        await blog.deleteOne();
        return res.json({
            status: 200,
            message: "Blog Deleted Successfully"
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

const GetBlog = async (req, res) => {
    try {
        const { BlogID } = await req.body;
        if (!BlogID) {
            return res.json({
                status: 304,
                message: "Please provide BlogId"
            })
        }

        const blog = await BlogModel.findById(BlogID);
        if (!blog) {
            return res.json({
                status: 304,
                message: "Blog Not Found"
            })
        }

        const user = await UserModel.findById(blog.User);
        if (!user) {
            return res.json({
                status: 304,
                message: "User Not Found"
            })
        }

        const blogData = {
            ...blog,
            author: user.username
        }

        return res.json({
            status: 200,
            message: "Blog Found",
            blogData
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: "An Error Occured"
        })
    }
}

const GetAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        return res.json({
            status: 200,
            message: "All Blogs Found",
            blogs
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "An Error Occured"
        })
    }
}

module.exports = { CreateBlog, DeleteBlog, GetBlog, GetAllBlogs };



