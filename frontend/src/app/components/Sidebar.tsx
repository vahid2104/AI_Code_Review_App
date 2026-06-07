import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileCode,
  History,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/new-review", label: "New Review", icon: FileCode },
  { path: "/app/history", label: "Review History", icon: History },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900/50 light:bg-white/90 backdrop-blur-xl border-r border-slate-800/50 light:border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white light:text-slate-900">AI Code Review</h1>
            <p className="text-xs text-slate-400 light:text-slate-600">Assistant</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white light:text-purple-700"
                  : "text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-slate-800/50 light:hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 light:border-slate-200">
        <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white light:text-slate-900 mb-1">
            Upgrade to Pro
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-600 mb-3">
            Get unlimited reviews and advanced features
          </p>
          <Link
            to="/app/upgrade"
            className="block w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </aside>
  );
}
