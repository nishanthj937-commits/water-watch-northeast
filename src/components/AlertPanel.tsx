import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "resolved";
  title: string;
  message: string;
  location: string;
  time: string;
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    bg: "bg-status-danger/8 border-status-danger/25",
    iconClass: "text-status-danger",
    badge: "status-danger",
    label: "Critical",
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-status-warning/8 border-status-warning/25",
    iconClass: "text-status-warning",
    badge: "status-warning",
    label: "Warning",
  },
  info: {
    icon: Info,
    bg: "bg-status-info/8 border-status-info/25",
    iconClass: "text-status-info",
    badge: "status-info",
    label: "Info",
  },
  resolved: {
    icon: CheckCircle,
    bg: "bg-status-safe/8 border-status-safe/25",
    iconClass: "text-status-safe",
    badge: "status-safe",
    label: "Resolved",
  },
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "E. coli Detected — Morigaon District",
    message: "Water sample from community well shows E. coli levels 3x above safe limit.",
    location: "Morigaon, Assam",
    time: "12 min ago",
  },
  {
    id: "2",
    type: "warning",
    title: "Turbidity Rising — Dimapur",
    message: "Turbidity levels approaching threshold after heavy rainfall.",
    location: "Dimapur, Nagaland",
    time: "45 min ago",
  },
  {
    id: "3",
    type: "warning",
    title: "Cholera Cases Reported — Silchar",
    message: "3 new suspected cholera cases in Silchar subdivision.",
    location: "Silchar, Assam",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "resolved",
    title: "Water Quality Restored — Shillong",
    message: "Chlorination treatment completed. Water now safe for consumption.",
    location: "Shillong, Meghalaya",
    time: "5 hours ago",
  },
];

const AlertPanel = () => {
  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold font-heading text-foreground">Active Alerts</h3>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full status-danger animate-pulse-gentle">
          2 Critical
        </span>
      </div>
      <div className="space-y-3">
        {mockAlerts.map((alert, i) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex gap-3 p-3 rounded-lg border ${config.bg}`}
            >
              <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${config.iconClass}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">📍 {alert.location}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertPanel;
