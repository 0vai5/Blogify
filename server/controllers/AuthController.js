import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const SignUP = async (req, res) => {
    try {
        const { email, userName, password } = await req.body;
        if (!email || !userName || !password) {
            return res.json({
                message: "All Fields are Required",
                status: 304
            })
        }
        const user = await UserModel.find({ email });
        if (user) {
            return res.json({
                message: "User Already Exists",
                status: 304
            })
        }

        const hashedPassword = bcrypt.hash(password, 10);
        const newUser = new UserModel({
            email,
            userName,
            password: hashedPassword
        })
        await newUser.save();
        return res.json({
            message: "User Created Successfully",
            status: 200
        })

    } catch (error) {
        return res.json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}

export const SignIN = async (req, res) => {
    try {
        const { email, password } = await req.body;
        if (!email || !password) {
            return res.json({
                status: 304,
                message: "All Fields are Required"
            })
        }

        const user = await UserModel.find({ email });
        if (!user) {
            return res.json({
                status: 404,
                message: "The User Not Exists"
            })
        }

        const checkedPassword = bcrypt.compare(password, user.password);
        if (!checkedPassword) {
            return res.json({
                status: 401,
                message: "Invalid Credentials"
            })
        }
        const tokenData = {
            userID: user._id,
            userName: user.userName
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })

        const response = res.json({
            status: 200,
            message: "Logged IN SuccessFully",
            user
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 3600,
            path: '/'
        })

        return response;

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something Went Wrong"
        })
    }
}

export const SignOut = async (req, res) => {
    try {
        const response = res.json({
            status: 200,
            message: "Successfully Logged Out"
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            maxAge: new Date(0),
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: "Something Went Wrong"
        })
    }
}