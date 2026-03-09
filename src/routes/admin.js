import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.get("/reports", verifyToken, requireAdmin, (req, res) => {
  res.json([{ id: 1, type: "report", status: "pending" }]);
});

export default router;