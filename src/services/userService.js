import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.join(__dirname, "..", "..", "data", "users.json");
const postsFile = path.join(__dirname, "..", "..", "data", "posts.json");

function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8") || "[]";
  return JSON.parse(raw);
}

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
