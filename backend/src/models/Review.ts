import mongoose, { Document, Schema } from "mongoose";

export type ReviewSeverity = "high" | "medium" | "low";

export type ReviewCategory =
  | "security"
  | "bug"
  | "readability"
  | "maintainability"
  | "performance";

export interface IReviewIssue {
  title: string;
  severity: ReviewSeverity;
  category: ReviewCategory;
  explanation: string;
  suggestedFix: string;
  codeExample?: string;
  line?: number;
}

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  language: string;
  codeSnippet?: string;
  score: number;
  issues: IReviewIssue[];
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewIssueSchema = new Schema<IReviewIssue>(
  {
    title: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    category: {
      type: String,
      enum: ["security", "bug", "readability", "maintainability", "performance"],
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    suggestedFix: {
      type: String,
      required: true,
    },
    codeExample: {
      type: String,
      default: "",
    },
    line: {
      type: Number,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      default: "untitled-code",
    },
    language: {
      type: String,
      required: true,
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    issues: {
      type: [reviewIssueSchema],
      default: [],
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;