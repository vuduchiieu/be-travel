import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: Number,
    image: String,
    provider: String,
    providerAccountId: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
