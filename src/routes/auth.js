import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Simple in-memory user store (TEMP for scratch build)
// Later we swap to Mongo/Postgres.
const users = new Map();

/**
 * POST /auth/register
 * body: { username, password }
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });

  if (users.has(username)) return res.status(409).json({ error: "username already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  users.set(username, { username, passwordHash });

  res.json({ ok: true, message: "registered" });
});

/**
 * POST /auth/login
 * body: { username, password }
 * returns: { token }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });

  const user = users.get(username);
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });

  const SECRET = process.env.JWT_SECRET || "dev-secret-change-this";
  if (!SECRET) return res.status(500).json({ error: "JWT_SECRET not set" });

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: "1h" });

  res.json({ ok: true, token });
})

export default router;