import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-this";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // No Authorization header
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Must be "Bearer <token>"
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    // Attach normalized user info
    req.user = {
      id: decoded.id,
      username:
        decoded.username ||
        decoded.email ||
        decoded.name ||
        "unknown"
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
