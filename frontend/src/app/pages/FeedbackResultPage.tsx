import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SeverityBadge } from "../components/SeverityBadge";
import { CategoryBadge } from "../components/CategoryBadge";
import {
  getReviewById,
  type Review,
  type ReviewIssue,
} from "../services/reviewService";

export function FeedbackResultPage() {
  const { id } = useParams();

  const [review, setReview] = useState<Review | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      if (!id) {
        setError("Review ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await getReviewById(id);
        setReview(response.review);

        if (response.review.issues.length > 0) {
          setExpandedIssues(new Set(["0"]));
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load review result.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);

    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }

    setExpandedIssues(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          <span>Loading review result...</span>
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="space-y-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-6 text-red-300 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold mb-1">Review not found</h2>
            <p className="text-sm">{error || "Unable to load this review."}</p>
          </div>
        </div>
      </div>
    );
  }

  const highIssues = review.issues.filter((issue) => issue.severity === "high");
  const mediumIssues = review.issues.filter(
    (issue) => issue.severity === "medium"
  );
  const lowIssues = review.issues.filter((issue) => issue.severity === "low");

  const qualityScore = review.score;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-white light:text-slate-900">
              Review Results
            </h1>
            <p className="text-slate-400 light:text-slate-600 mt-1">
              {review.fileName} • {review.language}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-slate-800/50 text-white rounded-lg hover:bg-slate-700/50 transition-colors">
            Export Report
          </button>

          <Link
            to="/app/new-review"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            New Review
          </Link>
        </div>
      </div>

      {review.summary && (
        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-white light:text-slate-900 mb-2">
            AI Summary
          </h2>
          <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
            {review.summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-400 light:text-slate-600 mb-4 text-center">
              Overall Code Quality
            </h3>

            <div className="relative w-40 h-40 mx-auto">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-800 light:text-slate-200"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 70 * (1 - qualityScore / 100)
                  }`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white light:text-slate-900">
                    {qualityScore}
                  </div>
                  <div className="text-sm text-slate-400 light:text-slate-600">
                    / 100
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 light:text-slate-600">
                  High Priority
                </span>
                <span className="text-red-400 font-semibold">
                  {highIssues.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 light:text-slate-600">
                  Medium Priority
                </span>
                <span className="text-amber-400 font-semibold">
                  {mediumIssues.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 light:text-slate-600">
                  Low Priority
                </span>
                <span className="text-blue-400 font-semibold">
                  {lowIssues.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {review.issues.length === 0 && (
            <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-white light:text-slate-900 mb-2">
                No issues found
              </h2>
              <p className="text-slate-400 light:text-slate-600">
                The AI review did not detect major issues in this code.
              </p>
            </div>
          )}

          {highIssues.length > 0 && (
            <IssueSection
              title="High Priority Issues"
              count={highIssues.length}
              countClass="bg-red-500/20 border-red-500/30 text-red-400"
              issues={highIssues}
              offset={0}
              expandedIssues={expandedIssues}
              onToggle={toggleIssue}
            />
          )}

          {mediumIssues.length > 0 && (
            <IssueSection
              title="Medium Priority Issues"
              count={mediumIssues.length}
              countClass="bg-amber-500/20 border-amber-500/30 text-amber-400"
              issues={mediumIssues}
              offset={highIssues.length}
              expandedIssues={expandedIssues}
              onToggle={toggleIssue}
            />
          )}

          {lowIssues.length > 0 && (
            <IssueSection
              title="Low Priority Issues"
              count={lowIssues.length}
              countClass="bg-blue-500/20 border-blue-500/30 text-blue-400"
              issues={lowIssues}
              offset={highIssues.length + mediumIssues.length}
              expandedIssues={expandedIssues}
              onToggle={toggleIssue}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function IssueSection({
  title,
  count,
  countClass,
  issues,
  offset,
  expandedIssues,
  onToggle,
}: {
  title: string;
  count: number;
  countClass: string;
  issues: ReviewIssue[];
  offset: number;
  expandedIssues: Set<string>;
  onToggle: (issueId: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-white light:text-slate-900">
          {title}
        </h2>
        <span
          className={`px-2 py-0.5 border rounded text-sm font-medium ${countClass}`}
        >
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {issues.map((issue, index) => {
          const issueId = String(offset + index);

          return (
            <IssueCard
              key={issueId}
              issue={issue}
              isExpanded={expandedIssues.has(issueId)}
              onToggle={() => onToggle(issueId)}
            />
          );
        })}
      </div>
    </div>
  );
}

function IssueCard({
  issue,
  isExpanded,
  onToggle,
}: {
  issue: ReviewIssue;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const borderColor =
    issue.severity === "high"
      ? "border-red-500/30"
      : issue.severity === "medium"
      ? "border-amber-500/30"
      : "border-blue-500/30";

  const handleCopyCode = async () => {
    if (!issue.codeExample) return;

    try {
      await navigator.clipboard.writeText(issue.codeExample);
    } catch (error) {
      console.error("Failed to copy code example:", error);
    }
  };

  return (
    <div
      className={`rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border ${borderColor} overflow-hidden`}
    >
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white light:text-slate-900">
                {issue.title}
              </h3>

              {issue.line && (
                <span className="text-xs px-2 py-0.5 bg-slate-800 light:bg-slate-100 text-slate-400 light:text-slate-600 rounded">
                  Line {issue.line}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <CategoryBadge category={issue.category} />
            </div>
          </div>

          <button className="p-1 text-slate-400 hover:text-white transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-800/50 light:border-slate-200">
            <div>
              <h4 className="text-sm font-semibold text-white light:text-slate-900 mb-2">
                Explanation
              </h4>
              <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                {issue.explanation}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white light:text-slate-900 mb-2">
                Suggested Fix
              </h4>
              <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                {issue.suggestedFix}
              </p>
            </div>

            {issue.codeExample && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white light:text-slate-900">
                    Code Example
                  </h4>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCopyCode();
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>

                <div className="bg-slate-950/80 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300">
                    <code>{issue.codeExample}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5"
                type="button"
                onClick={(event) => event.stopPropagation()}
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Fixed
              </button>

              <button
                className="px-4 py-2 bg-slate-800/50 text-white text-sm font-medium rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-1.5"
                type="button"
                onClick={(event) => event.stopPropagation()}
              >
                <XCircle className="w-4 h-4" />
                Ignore
              </button>

              <button
                className="px-4 py-2 bg-slate-800/50 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-1.5"
                type="button"
                onClick={(event) => event.stopPropagation()}
              >
                <Flag className="w-4 h-4" />
                Report Issue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}