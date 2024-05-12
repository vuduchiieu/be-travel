import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    image: [{ url: String }],
    milestone: String,
    isPublic: Boolean,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
