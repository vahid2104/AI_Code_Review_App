import { Request, Response } from "express";
import Review from "../models/Review";
import { analyzeCodeWithAI } from "../services/aiReviewService";

export const analyzeReview = async (req: Request, res: Response) => {
  try {
    const { code, language, fileName } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (!code || !language) {
      return res.status(400).json({
        message: "Code and language are required",
      });
    }

    if (code.length > 10000) {
      return res.status(400).json({
        message: "Code is too long. Maximum allowed length is 10000 characters.",
      });
    }

    const aiResult = await analyzeCodeWithAI({
      code,
      language,
    });

    const review = await Review.create({
      userId: req.user.id,
      fileName: fileName || "untitled-code",
      language,
      codeSnippet: code,
      score: aiResult.score,
      issues: aiResult.issues,
      summary: aiResult.summary,
    });

    return res.status(201).json({
      message: "Code analyzed successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while analyzing code",
      error,
    });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const reviews = await Review.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select("-codeSnippet");

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching reviews",
      error,
    });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const review = await Review.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    return res.status(200).json({
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching review",
      error,
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    return res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting review",
      error,
    });
  }
};