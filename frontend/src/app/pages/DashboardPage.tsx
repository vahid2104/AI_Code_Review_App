import { Link } from "react-router";
import {
  FileCode,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";

const stats = [
  {
    label: "Total Reviews",
    value: "127",
    change: "+12 this week",
    icon: FileCode,
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Issues Found",
    value: "342",
    change: "+28 this week",
    icon: AlertCircle,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    label: "Critical Issues",
    value: "23",
    change: "-5 from last week",
    icon: AlertCircle,
    color: "from-red-500 to-red-600",
  },
  {
    label: "Code Score",
    value: "87%",
    change: "+3% improvement",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
  },
];

const recentReviews = [
  {
    id: "1",
    name: "auth-service.ts",
    language: "TypeScript",
    issues: 5,
    criticalIssues: 2,
    status: "completed",
    date: "2026-06-06",
  },
  {
    id: "2",
    name: "UserController.java",
    language: "Java",
    issues: 12,
    criticalIssues: 1,
    status: "completed",
    date: "2026-06-05",
  },
  {
    id: "3",
    name: "data_processor.py",
    language: "Python",
    issues: 3,
    criticalIssues: 0,
    status: "completed",
    date: "2026-06-05",
  },
  {
    id: "4",
    name: "payment-gateway.js",
    language: "JavaScript",
    issues: 8,
    criticalIssues: 3,
    status: "completed",
    date: "2026-06-04",
  },
  {
    id: "5",
    name: "ApiClient.cs",
    language: "C#",
    issues: 6,
    criticalIssues: 1,
    status: "completed",
    date: "2026-06-04",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900">Dashboard</h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">Welcome back! Here's your code review overview</p>
        </div>
        <Link
          to="/app/new-review"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          New Review
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-400 light:text-slate-600">{stat.label}</p>
                <p className="text-3xl font-bold text-white light:text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 light:text-slate-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white light:text-slate-900">Recent Reviews</h2>
            <Link to="/app/history" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-950/50 light:bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 light:divide-slate-200">
              {recentReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-800/30 light:hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-white light:text-slate-900">{review.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-300 light:text-slate-700">{review.language}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300 light:text-slate-700">{review.issues} total</span>
                      {review.criticalIssues > 0 && (
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-medium">
                          {review.criticalIssues} critical
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 light:text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      {review.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/app/review/${review.id}`}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
