import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 light:from-slate-50 light:via-slate-100 light:to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white light:text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-400 light:text-slate-600">Start improving your code with AI</p>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8">
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white light:bg-slate-900 text-slate-900 light:text-white border border-slate-300 light:border-slate-700 rounded-lg hover:bg-slate-50 light:hover:bg-slate-800 transition-colors font-medium mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? "Signing up..." : "Sign up with Google"}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800 light:border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 light:bg-white text-slate-400 light:text-slate-600">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 pl-11 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 pl-11 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pl-11 pr-11 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pl-11 pr-11 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 rounded border-slate-700 light:border-slate-300 bg-slate-800 light:bg-slate-100 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
              />
              <label className="text-sm text-slate-400 light:text-slate-600">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400 light:text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
