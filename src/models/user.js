import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    image: { url: String },
    provider: String,
    providerAccountId: String,
    story: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    watching: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
