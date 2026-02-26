import { AlertTriangle, AlertCircle, Info, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info" | "resolved";
  title: string;
  message: string;
  location: string;
  created_at: string;
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    bg: "bg-status-danger/8 border-status-danger/25",
    iconClass: "text-status-danger",
    label: "Critical",
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-status-warning/8 border-status-warning/25",
    iconClass: "text-status-warning",
    label: "Warning",
  },
  info: {
    icon: Info,
    bg: "bg-status-info/8 border-status-info/25",
    iconClass: "text-status-info",
    label: "Info",
  },
  resolved: {
    icon: CheckCircle,
    bg: "bg-status-safe/8 border-status-safe/25",
    iconClass: "text-status-safe",
    label: "Resolved",
  },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const AlertPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase
        .from("alerts")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) setAlerts(data as Alert[]);
      setLoading(false);
    };
    fetchAlerts();

    const channel = supabase
      .channel("alerts-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "alerts" }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold font-heading text-foreground">Active Alerts</h3>
        {criticalCount > 0 && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full status-danger animate-pulse-gentle">
            {criticalCount} Critical
          </span>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, i) => {
            const config = alertConfig[alert.severity];
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
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo(alert.created_at)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">📍 {alert.location}</p>
                </div>
              </motion.div>
            );
          })}
          {alerts.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active alerts</p>}
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
