const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SignUP = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.json({
                message: "All Fields are Required",
                status: 304
            });
        }

        const user = await UserModel.findOne({ email }); // Changed to findOne
        if (user) {
            return res.json({
                message: "User Already Exists",
                status: 304
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Awaiting the hashing
        const newUser = new UserModel({
            email,
            username,
            password: hashedPassword
        });
        await newUser.save();
        return res.json({
            message: "User Created Successfully",
            status: 200
        });

    } catch (error) {
        return res.json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

const SignIN = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required"
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "The user does not exist"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const tokenData = {
            userID: user._id,
            userName: user.username
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1h" // Token validity
        });

        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600 * 1000, 
            path: "/"
        });

        // Send success response
        return res.json({
            status: 200,
            message: "Logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.json({
            status: 500,
            message: "Something went wrong"
        });
    }
};

const SignOut = async (req, res) => {
    try {
        res.clearCookie("token", { path: '/' }); // Clear the cookie
        return res.json({
            status: 200,
            message: "Successfully Logged Out"
        });

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something Went Wrong"
        });
    }
};

module.exports = { SignUP, SignIN, SignOut }; 
