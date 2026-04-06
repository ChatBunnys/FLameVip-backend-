import fs from "fs";
import path from "path";

const postsFile = path.join(process.cwd(), "data", "posts.json");

// Read posts from file
function readPosts() {
  if (!fs.existsSync(postsFile)) return [];
  const data = fs.readFileSync(postsFile, "utf8");
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write posts to file
function writePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

// Get paginated posts
export function getPosts({ page = 1, limit = 10 }) {
  const posts = readPosts();

  const start = (page - 1) * limit;
  const end = start + limit;

 return {
  ok: true,
  data: posts.slice(start, end),  // Wrap posts in 'data'
  page,
  limit,
  total: posts.length
};
}

// Create a new post
export function createPost({ user, content }) {
  const posts = readPosts();

  const post = {
    id: Date.now(),
    user,
    content,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };

  posts.unshift(post);
  writePosts(posts);

  return post;
}

// Like/unlike a post
export function likePost({ postId, user }) {
  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) return null;

  if (post.likes.includes(user)) {
    post.likes = post.likes.filter((u) => u !== user);
  } else {
    post.likes.push(user);
  }

  writePosts(posts);
  return post;
}

// Add a comment
export function addComment({ postId, user, text }) {
  const posts = readPosts();
  const post = posts.find((p) => p.id === postId);

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
