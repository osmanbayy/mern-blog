import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getComments, likeComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/comments/:postId", getComments);
router.put("/like/:commentId", verifyToken, likeComment);

export default router;
