import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.config.js";
import logger from "morgan";


const app = express();
dotenv.config();
const port = process.env.PORT;


connectDB();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(logger('dev'));



app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});
