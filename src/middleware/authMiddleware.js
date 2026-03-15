import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-this";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.username || decoded.email || decoded.name || "unknown"
    };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
