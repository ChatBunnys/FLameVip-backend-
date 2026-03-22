import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  handleGetPosts,
  handleCreatePost,
  handleLikePost,
  handleAddComment
} from "../controllers/postController.js";

const router = Router();

// GET /feed
router.get("/", verifyToken, handleGetPosts);

// POST /feed/create
router.post("/create", verifyToken, handleCreatePost);

// POST /feed/:id/like
router.post("/:id/like", verifyToken, handleLikePost);

// POST /feed/:id/comment
router.post("/:id/comment", verifyToken, handleAddComment);

export default router;
