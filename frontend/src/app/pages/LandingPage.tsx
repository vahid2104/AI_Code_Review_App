import { Link } from "react-router";
import {
  Shield,
  Bug,
  Eye,
  Wrench,
  GraduationCap,
  History,
  ArrowRight,
  Sparkles,
  Code,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Bug,
    title: "Bug Detection",
    description: "Automatically identify potential bugs and logical errors before they reach production.",
  },
  {
    icon: Shield,
    title: "Security Analysis",
    description: "Detect security vulnerabilities and common attack vectors in your codebase.",
  },
  {
    icon: Eye,
    title: "Code Quality Suggestions",
    description: "Get actionable recommendations to improve code structure and patterns.",
  },
  {
    icon: Wrench,
    title: "Readability Improvements",
    description: "Enhance code clarity with suggestions for better naming and documentation.",
  },
  {
    icon: GraduationCap,
    title: "Developer Learning Support",
    description: "Learn best practices and patterns through AI-powered explanations.",
  },
  {
    icon: History,
    title: "Review History",
    description: "Track all your code reviews and see your improvement over time.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Code Review Assistant</h1>
            </div>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Code Review Assistant
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Detect bugs, improve readability, and get instant AI-powered feedback before merging your code.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/app/new-review"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Review
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/app"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700/50"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0 divide-x divide-slate-800/50">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-semibold text-slate-300">Code Input</h3>
              </div>
              <div className="bg-slate-950/80 rounded-lg p-4 font-mono text-sm">
                <div className="text-slate-500 mb-1">1</div>
                <div className="text-slate-300">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-cyan-400">calculateTotal</span>
                  <span className="text-slate-400">(items) {"{"}</span>
                </div>
                <div className="text-slate-500 mb-1">2</div>
                <div className="text-slate-300 ml-4">
                  <span className="text-purple-400">let</span> total = <span className="text-green-400">0</span>;
                </div>
                <div className="text-slate-500 mb-1">3</div>
                <div className="text-slate-300 ml-4">
                  <span className="text-purple-400">for</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-purple-400">var</span> i = <span className="text-green-400">0</span>; i &lt; items.length; i++
                  <span className="text-slate-400">) {"{"}</span>
                </div>
                <div className="text-slate-500 mb-1">4</div>
                <div className="text-slate-300 ml-8">total += items[i];</div>
                <div className="text-slate-500 mb-1">5</div>
                <div className="text-slate-300 ml-4">
                  <span className="text-slate-400">{"}"}</span>
                </div>
                <div className="text-slate-500 mb-1">6</div>
                <div className="text-slate-300 ml-4">
                  <span className="text-purple-400">return</span> total;
                </div>
                <div className="text-slate-500">7</div>
                <div className="text-slate-300">
                  <span className="text-slate-400">{"}"}</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900/80">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-300">AI Feedback</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">Use const/let instead of var</h4>
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">Medium</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Replace 'var' with 'let' or 'const' to avoid scope issues and follow ES6 best practices.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Readability</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">Consider using Array.reduce()</h4>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Low</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Modern array methods are more concise and readable than manual loops.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Maintainability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-white mb-4">Powerful Features</h3>
          <p className="text-slate-400">Everything you need to write better, safer code</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800/50 hover:border-purple-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to improve your code?</h3>
          <p className="text-slate-300 mb-8">
            Join thousands of developers using AI-powered code reviews to ship better software.
          </p>
          <Link
            to="/app/new-review"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">© 2026 AI Code Review Assistant. Master's Thesis Prototype.</p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
