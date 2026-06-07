import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  updateUserSettings,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/settings", protect, updateUserSettings);

export default router;