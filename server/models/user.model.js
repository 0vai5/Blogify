import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already registerd"],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model("BlogUser", userSchema);
export default User;
