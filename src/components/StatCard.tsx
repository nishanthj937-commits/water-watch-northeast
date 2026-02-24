import { Droplets, Activity, AlertTriangle, Users, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  status?: "safe" | "warning" | "danger" | "info";
}

const statusStyles = {
  safe: "bg-status-safe/10 text-status-safe border-status-safe/20",
  warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
  danger: "bg-status-danger/10 text-status-danger border-status-danger/20",
  info: "bg-status-info/10 text-status-info border-status-info/20",
};

const iconBgStyles = {
  safe: "bg-status-safe/15 text-status-safe",
  warning: "bg-status-warning/15 text-status-warning",
  danger: "bg-status-danger/15 text-status-danger",
  info: "bg-status-info/15 text-status-info",
};

const StatCard = ({ title, value, change, trend, icon, status = "info" }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-lg p-5 border ${statusStyles[status]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold font-heading text-foreground">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : trend === "down" ? (
                <TrendingDown className="h-3.5 w-3.5" />
              ) : null}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`rounded-xl p-3 ${iconBgStyles[status]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
