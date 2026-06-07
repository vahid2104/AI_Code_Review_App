import { Search, Bell, User } from "lucide-react";

export function Navbar() {
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
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50 light:border-slate-300">
          <div className="text-right">
            <p className="text-sm font-medium text-white light:text-slate-900">Alex Developer</p>
            <p className="text-xs text-slate-400 light:text-slate-600">alex@company.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
