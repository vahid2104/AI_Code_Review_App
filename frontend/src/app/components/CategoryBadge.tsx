import { Shield, Bug, Eye, Wrench, Zap } from "lucide-react";

type Category = "security" | "bug" | "readability" | "maintainability" | "performance";

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = {
    security: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      icon: Shield,
      label: "Security",
    },
    bug: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      icon: Bug,
      label: "Bug",
    },
    readability: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      icon: Eye,
      label: "Readability",
    },
    maintainability: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      icon: Wrench,
      label: "Maintainability",
    },
    performance: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      icon: Zap,
      label: "Performance",
    },
  };

  const { bg, text, icon: Icon, label } = config[category];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${bg} ${text} text-xs font-medium`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
