import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="h-16 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews, files, or issues..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 light:bg-slate-100 border border-slate-700/50 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button
          className="relative p-2 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
          type="button"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-4 border-l border-slate-700/50 light:border-slate-300"
            type="button"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-white light:text-slate-900">
                {user?.name || "Demo User"}
              </p>
              <p className="text-xs text-slate-400 light:text-slate-600">
                {user?.email || "demo@example.com"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              {user?.name ? (
                <span className="text-white font-semibold">{userInitial}</span>
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800 light:border-slate-200">
                <p className="text-sm font-medium text-white light:text-slate-900">
                  {user?.name || "Demo User"}
                </p>
                <p className="text-xs text-slate-400 light:text-slate-600 truncate">
                  {user?.email || "demo@example.com"}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors flex items-center gap-2"
                type="button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}