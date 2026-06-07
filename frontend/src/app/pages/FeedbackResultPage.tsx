import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronDown,
  ChevronUp,
  Copy,
} from "lucide-react";
import { SeverityBadge } from "../components/SeverityBadge";
import { CategoryBadge } from "../components/CategoryBadge";

interface Issue {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  category: "security" | "bug" | "readability" | "maintainability" | "performance";
  explanation: string;
  suggestion: string;
  codeExample?: string;
  lineNumber?: number;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "SQL Injection Vulnerability",
    severity: "high",
    category: "security",
    explanation:
      "The code directly concatenates user input into SQL queries without proper sanitization. This creates a critical SQL injection vulnerability that could allow attackers to access or modify database contents.",
    suggestion:
      "Use parameterized queries or prepared statements to safely handle user input in database operations.",
    codeExample: `// Before
const query = "SELECT * FROM users WHERE id = " + userId;

// After
const query = "SELECT * FROM users WHERE id = ?";
db.execute(query, [userId]);`,
    lineNumber: 42,
  },
  {
    id: "2",
    title: "Use const/let instead of var",
    severity: "medium",
    category: "readability",
    explanation:
      "The code uses 'var' which has function scope and can lead to unexpected behavior. ES6 introduced 'let' and 'const' with block scope, which are more predictable and safer.",
    suggestion: "Replace 'var' declarations with 'const' for values that don't change, or 'let' for values that do.",
    codeExample: `// Before
for (var i = 0; i < items.length; i++) {
  // ...
}

// After
for (let i = 0; i < items.length; i++) {
  // ...
}`,
    lineNumber: 15,
  },
  {
    id: "3",
    title: "Missing Error Handling",
    severity: "high",
    category: "bug",
    explanation:
      "Async operations lack proper error handling. If the API call fails, the application will crash or enter an undefined state.",
    suggestion: "Add try-catch blocks around async operations and handle errors appropriately.",
    codeExample: `// Before
const data = await fetch('/api/data');

// After
try {
  const data = await fetch('/api/data');
  if (!data.ok) throw new Error('Failed to fetch');
} catch (error) {
  console.error('Error:', error);
  // Handle error appropriately
}`,
    lineNumber: 28,
  },
  {
    id: "4",
    title: "Consider using Array.reduce()",
    severity: "low",
    category: "maintainability",
    explanation:
      "The manual loop for summing array values can be replaced with the more concise and expressive Array.reduce() method.",
    suggestion: "Use functional array methods for better code readability and maintainability.",
    codeExample: `// Before
let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price;
}

// After
const total = items.reduce((sum, item) => sum + item.price, 0);`,
    lineNumber: 8,
  },
  {
    id: "5",
    title: "Inefficient DOM Queries",
    severity: "medium",
    category: "performance",
    explanation:
      "Multiple calls to document.querySelector() inside a loop can significantly impact performance. Cache the DOM reference instead.",
    suggestion: "Store DOM references in variables outside loops to avoid repeated queries.",
    codeExample: `// Before
for (let item of items) {
  document.querySelector('.container').appendChild(item);
}

// After
const container = document.querySelector('.container');
for (let item of items) {
  container.appendChild(item);
}`,
    lineNumber: 55,
  },
];

export function FeedbackResultPage() {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set(["1"]));

  const toggleIssue = (id: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIssues(newExpanded);
  };

  const highIssues = mockIssues.filter((i) => i.severity === "high");
  const mediumIssues = mockIssues.filter((i) => i.severity === "medium");
  const lowIssues = mockIssues.filter((i) => i.severity === "low");

  const qualityScore = 73;

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
            <h1 className="text-3xl font-bold text-white">Review Results</h1>
            <p className="text-slate-400 mt-1">auth-service.ts • TypeScript</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800/50 p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-4 text-center">Overall Code Quality</h3>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-800"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - qualityScore / 100)}`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{qualityScore}</div>
                  <div className="text-sm text-slate-400">/ 100</div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">High Priority</span>
                <span className="text-red-400 font-semibold">{highIssues.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Medium Priority</span>
                <span className="text-amber-400 font-semibold">{mediumIssues.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Low Priority</span>
                <span className="text-blue-400 font-semibold">{lowIssues.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {highIssues.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-white">High Priority Issues</h2>
                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-sm font-medium">
                  {highIssues.length}
                </span>
              </div>
              <div className="space-y-3">
                {highIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    isExpanded={expandedIssues.has(issue.id)}
                    onToggle={() => toggleIssue(issue.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {mediumIssues.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-white">Medium Priority Issues</h2>
                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded text-sm font-medium">
                  {mediumIssues.length}
                </span>
              </div>
              <div className="space-y-3">
                {mediumIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    isExpanded={expandedIssues.has(issue.id)}
                    onToggle={() => toggleIssue(issue.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {lowIssues.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-white">Low Priority Issues</h2>
                <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-sm font-medium">
                  {lowIssues.length}
                </span>
              </div>
              <div className="space-y-3">
                {lowIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    isExpanded={expandedIssues.has(issue.id)}
                    onToggle={() => toggleIssue(issue.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IssueCard({
  issue,
  isExpanded,
  onToggle,
}: {
  issue: Issue;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const borderColor =
    issue.severity === "high"
      ? "border-red-500/30"
      : issue.severity === "medium"
      ? "border-amber-500/30"
      : "border-blue-500/30";

  return (
    <div className={`rounded-xl bg-slate-900/50 backdrop-blur border ${borderColor} overflow-hidden`}>
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
              {issue.lineNumber && (
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                  Line {issue.lineNumber}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <CategoryBadge category={issue.category} />
            </div>
          </div>
          <button className="p-1 text-slate-400 hover:text-white transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4 pt-4 border-t border-slate-800/50">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Explanation</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{issue.explanation}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Suggested Fix</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{issue.suggestion}</p>
            </div>

            {issue.codeExample && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">Code Example</h4>
                  <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
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
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Mark as Fixed
              </button>
              <button className="px-4 py-2 bg-slate-800/50 text-white text-sm font-medium rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Ignore
              </button>
              <button className="px-4 py-2 bg-slate-800/50 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-1.5">
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
