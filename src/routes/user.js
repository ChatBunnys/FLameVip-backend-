import express from "express";
import { getUserProfile } from "../services/userService.js";

const router = express.Router();

router.get("/:username", (req, res) => {
  const profile = getUserProfile(req.params.username);

  if (!profile) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(profile);
});

export default router;
