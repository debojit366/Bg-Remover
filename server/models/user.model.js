user-model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/150", // Default avatar
  },
  firstname: {
    type: String,
    default: "User", // Default name
  },
  lastname: {
    type: String,
    default: "Name", // Default name
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
});

export const userModel = mongoose.model("user", userSchema);