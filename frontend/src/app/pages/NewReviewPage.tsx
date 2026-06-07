import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Upload, Trash2, Sparkles, Loader2 } from "lucide-react";

const languages = [
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
];

const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

const cart = [
  { name: "Laptop", price: 999, quantity: 1 },
  { name: "Mouse", price: 29, quantity: 2 }
];

console.log(calculateTotal(cart));`;

export function NewReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/app/review/1");
    }, 2000);
  };

  const handleLoadSample = () => {
    setCode(sampleCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900">New Code Review</h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">Paste your code and get instant AI-powered feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white light:text-slate-900">Code Editor</h2>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setCode("")}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Clear"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Upload File"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-[600px] p-6 bg-slate-950/50 light:bg-slate-50 text-white light:text-slate-900 font-mono text-sm focus:outline-none resize-none placeholder:text-slate-500 light:placeholder:text-slate-400"
                style={{ lineHeight: "1.6" }}
              />
              {!code && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Code className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500 mb-2">No code yet</p>
                    <button
                      onClick={handleLoadSample}
                      className="text-sm text-purple-400 hover:text-purple-300 pointer-events-auto"
                    >
                      Load sample code
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800/50 light:border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-400 light:text-slate-600">
                {code.split("\n").length} lines • {code.length} characters
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!code.trim() || isAnalyzing}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white light:text-slate-900">AI Feedback</h3>
            </div>

            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="text-sm text-slate-300 light:text-slate-700">Analyzing your code...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-800 light:bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs text-slate-500 light:text-slate-600">Checking for bugs and security issues</p>
                </div>
              </div>
            ) : code ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-slate-400 light:text-slate-600 text-sm mb-4">Ready to analyze your code</p>
                <p className="text-xs text-slate-500 light:text-slate-600">Click "Analyze Code" to get AI feedback</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-slate-800 light:bg-slate-200 flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-slate-600 light:text-slate-400" />
                </div>
                <p className="text-slate-500 light:text-slate-600 text-sm">Paste code to begin</p>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur p-6">
            <h3 className="text-sm font-semibold text-white light:text-slate-900 mb-3">What we check for:</h3>
            <ul className="space-y-2 text-sm text-slate-300 light:text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Security vulnerabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Potential bugs and errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Code quality and patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Performance optimizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Readability improvements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
