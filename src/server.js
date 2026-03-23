import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";   // ✅ REQUIRED

const app = express();

// ---- Security & basics ----
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

// CORS
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

// Rate limiting
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
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);   // ✅ REQUIRED

// ---- Start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ FlameVip backend running on http://localhost:${PORT}`);
});
