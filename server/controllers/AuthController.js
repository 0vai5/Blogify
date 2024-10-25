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
        if (!email || !password) {
            return res.json({
                status: 304,
                message: "All Fields are Required"
            });
        }

        const user = await UserModel.findOne({ email }); // Changed to findOne
        if (!user) {
            return res.json({
                status: 404,
                message: "The User Does Not Exist"
            });
        }

        const checkedPassword = await bcrypt.compare(password, user.password); // Awaiting the password check
        if (!checkedPassword) {
            return res.json({
                status: 401,
                message: "Invalid Credentials"
            });
        }

        const tokenData = {
            userID: user._id,
            userName: user.userName
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });

        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600 * 1000, // 1 hour in milliseconds
            path: '/'
        });

        return res.json({
            status: 200,
            message: "Logged In Successfully",
            user
        });

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something Went Wrong"
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
