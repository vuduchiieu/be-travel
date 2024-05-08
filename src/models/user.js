import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    image: String,
    provider: String,
    providerAccountId: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
