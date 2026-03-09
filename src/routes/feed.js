import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json([
    { message: "Protected feed data", user: req.user }
  ]);
});

export default router;