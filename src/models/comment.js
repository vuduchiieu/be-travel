import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);
export const Comment = mongoose.model("Comment", commentSchema);
