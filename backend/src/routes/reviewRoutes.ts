import express from "express";
import {
  analyzeReview,
  deleteReview,
  getReviewById,
  getReviews,
} from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/analyze", protect, analyzeReview);
router.get("/", protect, getReviews);
router.get("/:id", protect, getReviewById);
router.delete("/:id", protect, deleteReview);

export default router;