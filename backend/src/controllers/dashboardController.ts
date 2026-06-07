import { Request, Response } from "express";
import Review from "../models/Review";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const reviews = await Review.find({ userId: req.user.id });

    const totalReviews = reviews.length;
    const totalIssues = reviews.reduce(
      (sum, review) => sum + review.issues.length,
      0
    );

    const criticalIssues = reviews.reduce((sum, review) => {
      return (
        sum +
        review.issues.filter((issue) => issue.severity === "high").length
      );
    }, 0);

    const averageScore =
      totalReviews === 0
        ? 0
        : Math.round(
            reviews.reduce((sum, review) => sum + review.score, 0) /
              totalReviews
          );

    const recentReviews = reviews
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((review) => ({
        id: review._id,
        fileName: review.fileName,
        language: review.language,
        issues: review.issues.length,
        criticalIssues: review.issues.filter(
          (issue) => issue.severity === "high"
        ).length,
        score: review.score,
        status: "Completed",
        date: review.createdAt,
      }));

    return res.status(200).json({
      stats: {
        totalReviews,
        totalIssues,
        criticalIssues,
        averageScore,
      },
      recentReviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching dashboard stats",
      error,
    });
  }
};