import mongoose from "mongoose";

const connection = {}
const connectDB = async () => {
    if (connection.isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;

        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting DB");
        process.exit(1)
    }
};

export default connectDB;
