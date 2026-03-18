import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.status(503).json({ error: "Uploads temporarily disabled" });
});

export default router;
