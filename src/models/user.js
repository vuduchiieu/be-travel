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
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
