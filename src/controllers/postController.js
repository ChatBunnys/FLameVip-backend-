import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-this";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // No Authorization header provided
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Expecting "Bearer <token>"
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    // Normalize user info from token
    req.user = {
      id: decoded.id,
      username:
        decoded.username ||
        decoded.email ||
        decoded.name ||
        "unknown"
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
