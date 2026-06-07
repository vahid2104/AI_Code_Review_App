import { Link } from "react-router-dom";
import {
  Book,
  Code,
  Sparkles,
  FileCode,
  Settings,
  Zap,
  Shield,
  ArrowLeft,
} from "lucide-react";

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 light:from-slate-50 light:via-slate-100 light:to-slate-50">
      <header className="border-b border-slate-800/50 light:border-slate-200 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white light:text-slate-900">AI Code Review</h1>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white light:text-slate-900">Documentation</h1>
          </div>
          <p className="text-xl text-slate-400 light:text-slate-600">
            Learn how to use AI Code Review Assistant to improve your code quality
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white light:text-slate-900">Getting Started</h2>
            </div>
            <div className="space-y-4 text-slate-300 light:text-slate-700">
              <p>
                AI Code Review Assistant helps developers identify bugs, security vulnerabilities, and code
                quality issues using advanced AI technology.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Create an account or sign in with Google</li>
                <li>Navigate to "New Review" from the dashboard</li>
                <li>Paste your code or upload a file</li>
                <li>Select your programming language</li>
                <li>Click "Analyze Code" to get instant feedback</li>
              </ol>
            </div>
          </section>

          <section className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white light:text-slate-900">Supported Languages</h2>
            </div>
            <div className="space-y-4 text-slate-300 light:text-slate-700">
              <p>AI Code Review Assistant supports the following programming languages:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "JavaScript",
                  "TypeScript",
                  "Python",
                  "Java",
                  "C#",
                  "Go",
                  "Rust",
                  "PHP",
                  "Ruby",
                  "Swift",
                ].map((lang) => (
                  <div
                    key={lang}
                    className="px-4 py-2 bg-slate-800/50 light:bg-slate-100 border border-slate-700/50 light:border-slate-300 rounded-lg text-center"
                  >
                    {lang}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 light:text-slate-600">
                More languages are being added regularly based on user feedback.
              </p>
            </div>
          </section>

          <section className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white light:text-slate-900">Issue Categories</h2>
            </div>
            <div className="space-y-4 text-slate-300 light:text-slate-700">
              <p>Our AI analyzes your code across multiple dimensions:</p>
              <div className="space-y-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h3 className="font-semibold text-white light:text-slate-900 mb-2">Security</h3>
                  <p className="text-sm">
                    Identifies SQL injection, XSS vulnerabilities, insecure authentication, and other security
                    risks.
                  </p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="font-semibold text-white light:text-slate-900 mb-2">Bugs</h3>
                  <p className="text-sm">
                    Detects logical errors, null pointer exceptions, race conditions, and potential runtime
                    issues.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h3 className="font-semibold text-white light:text-slate-900 mb-2">Readability</h3>
                  <p className="text-sm">
                    Suggests improvements for naming conventions, code structure, and documentation.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h3 className="font-semibold text-white light:text-slate-900 mb-2">Maintainability</h3>
                  <p className="text-sm">
                    Recommends refactoring opportunities, reduces code duplication, and improves modularity.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-white light:text-slate-900 mb-2">Performance</h3>
                  <p className="text-sm">
                    Identifies inefficient algorithms, memory leaks, and optimization opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white light:text-slate-900">Understanding Results</h2>
            </div>
            <div className="space-y-4 text-slate-300 light:text-slate-700">
              <p>Each review provides:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white light:text-slate-900">Overall Quality Score</strong> - A score
                  from 0-100 indicating code quality
                </li>
                <li>
                  <strong className="text-white light:text-slate-900">Issue Severity</strong> - High, Medium, or
                  Low priority classifications
                </li>
                <li>
                  <strong className="text-white light:text-slate-900">Detailed Explanations</strong> - Why each
                  issue matters
                </li>
                <li>
                  <strong className="text-white light:text-slate-900">Suggested Fixes</strong> - Specific code
                  examples showing how to resolve issues
                </li>
                <li>
                  <strong className="text-white light:text-slate-900">Line Numbers</strong> - Exact locations of
                  identified issues
                </li>
              </ul>
            </div>
          </section>

          <section className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-slate-400" />
              <h2 className="text-2xl font-bold text-white light:text-slate-900">API Access</h2>
            </div>
            <div className="space-y-4 text-slate-300 light:text-slate-700">
              <p>Pro and Enterprise users can access our API to integrate code reviews into their workflow:</p>
              <div className="bg-slate-950/80 light:bg-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-slate-300 light:text-slate-700">
                  {`POST /api/v1/review
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "code": "function example() { ... }",
  "language": "javascript"
}`}
                </pre>
              </div>
              <p className="text-sm text-slate-400 light:text-slate-600">
                Visit Settings → API Configuration to generate your API key.
              </p>
            </div>
          </section>

          <section className="rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur p-8 text-center">
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Need Help?</h2>
            <p className="text-slate-300 light:text-slate-700 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="mailto:support@aicodereviewer.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Contact Support
              </a>
              <Link
                to="/register"
                className="px-6 py-3 bg-slate-800/50 light:bg-white text-white light:text-slate-900 font-semibold rounded-lg hover:bg-slate-700/50 light:hover:bg-slate-100 transition-colors border border-slate-700 light:border-slate-300"
              >
                Get Started
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800/50 light:border-slate-200 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-slate-400 light:text-slate-600 text-sm text-center">
            © 2026 AI Code Review Assistant. Master's Thesis Prototype.
          </p>
        </div>
      </footer>
    </div>
  );
}
