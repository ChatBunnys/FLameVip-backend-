import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

// simple memory storage
let posts = [];

// get all posts
router.get("/", verifyToken, (req, res) => {
  res.json(posts);
});

// create new post
router.post("/create", verifyToken, (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Post content required" });
  }

  const post = {
    id: Date.now(),
    user: req.user.username,
    content,
    created: new Date()
  };

  posts.unshift(post);

  res.json(post);
});

export default router;


  
