import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Calendar, FileCode, Clock, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const categoryData = [
  { name: "Security", count: 45, color: "#a855f7" },
  { name: "Bugs", count: 67, color: "#ef4444" },
  { name: "Readability", count: 89, color: "#06b6d4" },
  { name: "Maintainability", count: 72, color: "#3b82f6" },
  { name: "Performance", count: 34, color: "#10b981" },
];

const allReviews = [
  {
    id: "1",
    name: "auth-service.ts",
    language: "TypeScript",
    issues: 5,
    criticalIssues: 2,
    date: "2026-06-06",
    time: "14:32",
  },
  {
    id: "2",
    name: "UserController.java",
    language: "Java",
    issues: 12,
    criticalIssues: 1,
    date: "2026-06-05",
    time: "11:15",
  },
  {
    id: "3",
    name: "data_processor.py",
    language: "Python",
    issues: 3,
    criticalIssues: 0,
    date: "2026-06-05",
    time: "09:47",
  },
  {
    id: "4",
    name: "payment-gateway.js",
    language: "JavaScript",
    issues: 8,
    criticalIssues: 3,
    date: "2026-06-04",
    time: "16:20",
  },
  {
    id: "5",
    name: "ApiClient.cs",
    language: "C#",
    issues: 6,
    criticalIssues: 1,
    date: "2026-06-04",
    time: "13:55",
  },
  {
    id: "6",
    name: "validation.go",
    language: "Go",
    issues: 4,
    criticalIssues: 0,
    date: "2026-06-03",
    time: "15:30",
  },
  {
    id: "7",
    name: "utils.ts",
    language: "TypeScript",
    issues: 7,
    criticalIssues: 2,
    date: "2026-06-03",
    time: "10:12",
  },
  {
    id: "8",
    name: "database.py",
    language: "Python",
    issues: 15,
    criticalIssues: 4,
    date: "2026-06-02",
    time: "14:45",
  },
];

export function ReviewHistoryPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("7");

  const languages = ["all", ...new Set(allReviews.map((r) => r.language))];

  const filteredReviews = allReviews.filter((review) => {
    if (selectedLanguage !== "all" && review.language !== selectedLanguage) return false;
    if (selectedSeverity === "critical" && review.criticalIssues === 0) return false;
    return true;
  });

  const groupedByDate = filteredReviews.reduce((acc, review) => {
    if (!acc[review.date]) {
      acc[review.date] = [];
    }
    acc[review.date].push(review);
    return acc;
  }, {} as Record<string, typeof allReviews>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Review History</h1>
          <p className="text-slate-400 mt-1">Browse and analyze your past code reviews</p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Most Common Issue Categories</h3>
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
      </div>

      <div className="rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800/50 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">All Reviews</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Filters</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Severity:</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="all">All Issues</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Date Range:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>

            {(selectedLanguage !== "all" || selectedSeverity !== "all") && (
              <button
                onClick={() => {
                  setSelectedLanguage("all");
                  setSelectedSeverity("all");
                }}
                className="px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {Object.entries(groupedByDate).map(([date, reviews]) => (
            <div key={date} className="mb-8 last:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">{date}</h3>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              <div className="space-y-3">
                {reviews.map((review) => (
                  <Link
                    key={review.id}
                    to={`/app/review/${review.id}`}
                    className="block p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                          <FileCode className="w-5 h-5 text-purple-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {review.name}
                            </h4>
                            <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded text-xs">
                              {review.language}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              {review.time}
                            </div>
                            <div className="text-slate-400">{review.issues} issues found</div>
                            {review.criticalIssues > 0 && (
                              <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-medium">
                                {review.criticalIssues} critical
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <FileCode className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400">No reviews found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
