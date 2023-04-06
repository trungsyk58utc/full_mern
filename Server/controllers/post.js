import { PostModel } from "../models/Post.js";

export const postPost = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({
      error: "Title is required",
    });
  } else {
    try {
      const userId = req.userId;
      const saveDescription = description || "";
      const newPost = new PostModel({
        title,
        description: saveDescription,
        author: userId,
      });
      await newPost.save();
      res.status(200).json({
        status: "New post has been posted",
      });
    } catch (error) {
      res.status(500).json({
        error: "Server error",
      });
    }
  }
};

export const getPost = async (req, res) => {
  const posts = await PostModel.find({}).populate("author", ["username"]);
  res.status(200).json(posts);
};

export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: "Can't find with this id",
    });
  }
};
