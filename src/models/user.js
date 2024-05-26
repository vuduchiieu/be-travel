import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    image: String,
    provider: String,
    providerAccountId: String,
    story: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
