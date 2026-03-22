import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  getFeed,
  createFeedPost,
  likeFeedPost,
  commentOnPost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", verifyToken, getFeed);
router.post("/create", verifyToken, createFeedPost);
router.post("/:id/like", verifyToken, likeFeedPost);
router.post("/:id/comment", verifyToken, commentOnPost);

export default router;
