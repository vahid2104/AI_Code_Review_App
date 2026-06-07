import { AlertCircle, AlertTriangle, Info } from "lucide-react";

type Severity = "high" | "medium" | "low";

interface SeverityBadgeProps {
  severity: Severity;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = {
    high: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: AlertCircle,
      label: "High",
    },
    medium: {
      bg: "bg-amber-500/20",
      border: "border-amber-500/30",
      text: "text-amber-400",
      icon: AlertTriangle,
      label: "Medium",
    },
    low: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      text: "text-blue-400",
      icon: Info,
      label: "Low",
    },
  };

  const { bg, border, text, icon: Icon, label } = config[severity];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${bg} ${border} ${text} text-xs font-medium`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
