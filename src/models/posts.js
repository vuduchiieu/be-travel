import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    image: [{ url: String }],
    milestone: String,
    isPublic: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    content: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
export const Like = mongoose.model("Like", likeSchema);
