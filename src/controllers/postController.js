import {
  getPosts,
  createPost,
  likePost,
  addComment,
} from "../services/postService.js";

export function getFeed(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = getPosts({ page, limit });
  res.json(result);
}

export function createFeedPost(req, res) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Post content required" });
  }

  const post = createPost({
    user: req.user.username,
    content,
  });

  res.status(201).json(post);
}

export function likeFeedPost(req, res) {
  const postId = Number(req.params.id);

  const post = likePost({
    postId,
    user: req.user.username,
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
}

export function commentOnPost(req, res) {
  const postId = Number(req.params.id);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text required" });
  }

  const comment = addComment({
    postId,
    user: req.user.username,
    text,
  });

  if (!comment) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(201).json(comment);
}
