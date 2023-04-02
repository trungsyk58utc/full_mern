import express from 'express';
import { currentUser, getListUser, login, registerAccount } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/listUsers", verifyToken ,getListUser)

router.post("/register", registerAccount)

router.post("/login", login)

router.get("/currentUser", verifyToken, currentUser)

export default router;