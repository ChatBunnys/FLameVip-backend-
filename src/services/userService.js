import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data file locations
const usersFile = path.join(__dirname, "..", "..", "data", "users.json");
const postsFile = path.join(__dirname, "..", "..", "data", "posts.json");

// Safe JSON reader
function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, "utf8") || "[]";
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Get a user's profile + posts
export function getUserProfile(username) {
  const users = readJSON(usersFile);
  const posts = readJSON(postsFile);

  const user = users.find(u => u.username === username);
  if (!user) return null;

  const userPosts = posts.filter(p => p.user === username);

  return {
    username: user.username,
    bio: user.bio || "",
    posts: userPosts
  };
}
