import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, Lock, Mail, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/app");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1d] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-6">
            <Sparkles size={28} />
          </div>

          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue to AI Code Review</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1528] border border-slate-800 rounded-2xl p-8"
        >
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="button"
            className="w-full bg-white text-slate-900 rounded-lg py-3 font-medium mb-6"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-sm text-slate-500">Or continue with email</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg bg-[#162238] border border-slate-700 py-3 pl-12 pr-4 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg bg-[#162238] border border-slate-700 py-3 pl-12 pr-12 outline-none focus:border-purple-500"
              />
              <Eye
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button" className="text-purple-400">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 py-3 font-semibold disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-purple-400 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}