import * as argon2 from "argon2";
import { UsersModel } from "../models/Users.js";
import jwt from "jsonwebtoken";

export const getListUser = async (req, res) => {
  const user = await UsersModel.find();
  return res.status(200).json(user);
};

export const registerAccount = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json({
      error: "Invalid username or password",
    });
  }
  try {
    const user = await UsersModel.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "Account already exists",
      });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new UsersModel({ username, password: hashPassword });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Can't create user",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json("Username or password is not blank");
  }

  const user = await UsersModel.findOne({ username });
  const passwordVaild = await argon2.verify(user.password, password);

  if (passwordVaild) {
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_RESET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      username: username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    res.status(403).json({ error: "Incorrect username or password" });
  }
};

export const currentUser = async (req, res) => {
  const userId = req.userId;
  const user = await UsersModel.findOne({ _id: userId }).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      error: "User not found",
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(403).json({ error: "refresh token is required" });
  } else {
    try {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_RESET);

      const newToken = jwt.sign(
        { userId: decode.userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3h" }
      );

      res.status(200).json({
        accessToken: newToken,
      });
    } catch (error) {
      console.log(error);
      res.status(402).json({
        error: "Refresh token is expired",
      });
    }
  }
};
