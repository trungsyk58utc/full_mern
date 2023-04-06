import mongoose, { Schema } from "mongoose";

const Post = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
}, {timestamps: true});

export const PostModel = mongoose.model("Post", Post)
