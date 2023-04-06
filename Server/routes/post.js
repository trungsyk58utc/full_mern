import express from "express";
import { getPost, getPostById, postPost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken ,postPost);

router.get("/", verifyToken, getPost);

router.get("/:id", verifyToken, getPostById);

export default router;