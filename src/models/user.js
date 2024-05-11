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
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    watching: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
