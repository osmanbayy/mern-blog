import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getComments, likeComment, editComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/comments/:postId", getComments);
router.put("/like/:commentId", verifyToken, likeComment);
router.put("/edit/:commentId", verifyToken, editComment);

export default router;
