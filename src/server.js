import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

// ---- Security & basics ----
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

// CORS (locked to origin from env, but safe fallback)
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

// Rate limiting (basic protection)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// ---- Routes ----
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "flamevip-backend" });
});

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);
app.use("/admin", adminRoutes);

// ---- Start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ FlameVip backend running on http://localhost:${PORT}`);
});
