import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsFile = path.join(__dirname, "..", "..", "data", "posts.json");

function readPosts() {
  if (!fs.existsSync(postsFile)) return [];
  const raw = fs.readFileSync(postsFile, "utf8") || "[]";
  return JSON.parse(raw);
}

function writePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

export function getPosts({ page = 1, limit = 10 }) {
  const posts = readPosts().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    total: posts.length,
    page,
    limit,
    data: posts.slice(start, end),
  };
}

export function createPost({ user, content }) {
  const posts = readPosts();

  const post = {
    id: Date.now(),
    user,
    content,
    likes: 0,
    likedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };

  posts.unshift(post);
  writePosts(posts);
  return post;
}

export function likePost({ postId, user }) {
  const posts = readPosts();
  const post = posts.find(p => p.id === postId);

  if (!post) return null;

  if (!post.likedBy.includes(user)) {
    post.likedBy.push(user);
    post.likes = post.likedBy.length;
    writePosts(posts);
  }

  return post;
}

export function addComment({ postId, user, text }) {
  const posts = readPosts();
  const post = posts.find(p => p.id === postId);

  if (!post) return null;

  const comment = {
    id: Date.now(),
    user,
    text,
    createdAt: new Date().toISOString(),
  };

  post.comments.push(comment);
  writePosts(posts);
  return comment;
}
