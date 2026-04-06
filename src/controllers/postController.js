import { 
  getPosts, 
  createPost, 
  likePost, 
  addComment 
} from "../services/postService.js";

export function handleGetPosts(req, res) {
  const page = req.query.page || 1;
  const result = getPosts({ page, limit: 10 });
  res.json({ ok: true, data: result.posts, ...result });
}

export function handleCreatePost(req, res) {
  const { content, media } = req.body;
  const post = createPost({ user: req.user.username, content, media });
  res.json({ ok: true, post });
}

export function handleLikePost(req, res) {
  const { id } = req.params;
  const post = likePost({ postId: parseInt(id), user: req.user.username });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ ok: true, post });
}

export function handleAddComment(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const comment = addComment({ postId: parseInt(id), user: req.user.username, text });
  if (!comment) return res.status(404).json({ error: "Post not found" });
  res.json({ ok: true, comment });
}
