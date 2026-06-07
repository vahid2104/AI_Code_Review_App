import { apiRequest } from "./api";

export type ReviewSeverity = "high" | "medium" | "low";

export type ReviewCategory =
  | "security"
  | "bug"
  | "readability"
  | "maintainability"
  | "performance";

export interface ReviewIssue {
  title: string;
  severity: ReviewSeverity;
  category: ReviewCategory;
  explanation: string;
  suggestedFix: string;
  codeExample?: string;
  line?: number;
}

export interface Review {
  _id: string;
  userId: string;
  fileName: string;
  language: string;
  codeSnippet?: string;
  score: number;
  issues: ReviewIssue[];
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyzeReviewData {
  fileName: string;
  language: string;
  code: string;
}

export interface AnalyzeReviewResponse {
  message: string;
  review: Review;
}

export interface ReviewsResponse {
  reviews: Review[];
}

export interface DashboardStats {
  totalReviews: number;
  totalIssues: number;
  criticalIssues: number;
  averageScore: number;
}

export interface RecentReview {
  id: string;
  fileName: string;
  language: string;
  issues: number;
  criticalIssues: number;
  score: number;
  status: string;
  date: string;
}

export interface DashboardStatsResponse {
  stats: DashboardStats;
  recentReviews: RecentReview[];
}

export const analyzeCode = async (
  data: AnalyzeReviewData
): Promise<AnalyzeReviewResponse> => {
  return apiRequest<AnalyzeReviewResponse>("/reviews/analyze", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getReviews = async (): Promise<ReviewsResponse> => {
  return apiRequest<ReviewsResponse>("/reviews", {
    method: "GET",
  });
};

export const getReviewById = async (
  id: string
): Promise<{ review: Review }> => {
  return apiRequest<{ review: Review }>(`/reviews/${id}`, {
    method: "GET",
  });
};

export const deleteReview = async (
  id: string
): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/reviews/${id}`, {
    method: "DELETE",
  });
};

export const getDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    return apiRequest<DashboardStatsResponse>("/dashboard/stats", {
      method: "GET",
    });
  };