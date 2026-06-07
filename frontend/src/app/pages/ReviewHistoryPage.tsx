import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Calendar,
  FileCode,
  Clock,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getReviews, type Review } from "../services/reviewService";

const categoryColors: Record<string, string> = {
  Security: "#a855f7",
  Bugs: "#ef4444",
  Readability: "#06b6d4",
  Maintainability: "#3b82f6",
  Performance: "#10b981",
};

const categoryLabels: Record<string, string> = {
  security: "Security",
  bug: "Bugs",
  readability: "Readability",
  maintainability: "Maintainability",
  performance: "Performance",
};

export function ReviewHistoryPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("7");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getReviews();
        setReviews(response.reviews);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load review history.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const languages = useMemo(() => {
    return ["all", ...new Set(reviews.map((review) => review.language))];
  }, [reviews]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {
      Security: 0,
      Bugs: 0,
      Readability: 0,
      Maintainability: 0,
      Performance: 0,
    };

    reviews.forEach((review) => {
      review.issues.forEach((issue) => {
        const label = categoryLabels[issue.category] || issue.category;
        counts[label] = (counts[label] || 0) + 1;
      });
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: categoryColors[name] || "#64748b",
    }));
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (selectedLanguage !== "all" && review.language !== selectedLanguage) {
        return false;
      }

      if (
        selectedSeverity === "critical" &&
        !review.issues.some((issue) => issue.severity === "high")
      ) {
        return false;
      }

      if (dateRange !== "all") {
        const reviewDate = new Date(review.createdAt);
        const now = new Date();
        const rangeDays = Number(dateRange);
        const diffInMs = now.getTime() - reviewDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays > rangeDays) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, selectedLanguage, selectedSeverity, dateRange]);

  const groupedByDate = useMemo(() => {
    return filteredReviews.reduce((acc, review) => {
      const date = new Date(review.createdAt).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(review);
      return acc;
    }, {} as Record<string, Review[]>);
  }, [filteredReviews]);

  const clearFilters = () => {
    setSelectedLanguage("all");
    setSelectedSeverity("all");
    setDateRange("7");
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          <span>Loading review history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900">
            Review History
          </h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">
            Browse and analyze your past code reviews
          </p>
        </div>

        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-6 text-red-300">
          <h2 className="text-lg font-semibold mb-1">
            Could not load review history
          </h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900">
            Review History
          </h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">
            Browse and analyze your past code reviews
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-white light:text-slate-900 mb-4">
          Most Common Issue Categories
        </h3>

        {reviews.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-slate-500">
            No issue category data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white light:text-slate-900">
              All Reviews
            </h2>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Filters</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400 light:text-slate-600">
                Language:
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400 light:text-slate-600">
                Severity:
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="all">All Issues</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400 light:text-slate-600">
                Date Range:
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>

            {(selectedLanguage !== "all" ||
              selectedSeverity !== "all" ||
              dateRange !== "7") && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                type="button"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {Object.entries(groupedByDate).map(([date, dateReviews]) => (
            <div key={date} className="mb-8 last:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white light:text-slate-900">
                  {date}
                </h3>
                <div className="flex-1 h-px bg-slate-800 light:bg-slate-200" />
              </div>

              <div className="space-y-3">
                {dateReviews.map((review) => {
                  const criticalIssues = review.issues.filter(
                    (issue) => issue.severity === "high"
                  ).length;

                  const reviewTime = new Date(
                    review.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <Link
                      key={review._id}
                      to={`/app/review/${review._id}`}
                      className="block p-4 rounded-lg bg-slate-800/30 light:bg-slate-50 hover:bg-slate-800/50 light:hover:bg-slate-100 border border-slate-700/30 light:border-slate-200 hover:border-purple-500/30 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                            <FileCode className="w-5 h-5 text-purple-400" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-semibold text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                                {review.fileName}
                              </h4>
                              <span className="px-2 py-0.5 bg-slate-700/50 light:bg-slate-200 text-slate-300 light:text-slate-700 rounded text-xs">
                                {review.language}
                              </span>
                              <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                                {review.score}/100
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-600">
                                <Clock className="w-3.5 h-3.5" />
                                {reviewTime}
                              </div>

                              <div className="text-slate-400 light:text-slate-600">
                                {review.issues.length} issues found
                              </div>

                              {criticalIssues > 0 && (
                                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-medium">
                                  {criticalIssues} critical
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <FileCode className="w-12 h-12 text-slate-700 light:text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 light:text-slate-600">
                No reviews found matching your filters
              </p>

              {reviews.length === 0 && (
                <Link
                  to="/app/new-review"
                  className="inline-flex mt-5 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Create First Review
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}