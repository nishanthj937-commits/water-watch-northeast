import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RegionData {
  id: string;
  name: string;
  state: string;
  risk_level: string;
  ph_level: number | null;
  turbidity: number | null;
  coliform_count: number | null;
}

const statusLabel: Record<string, { text: string; class: string }> = {
  low: { text: "Safe", class: "status-safe" },
  medium: { text: "At Risk", class: "status-warning" },
  high: { text: "Critical", class: "status-danger" },
};

const RegionTable = () => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("regions")
        .select("id, name, state, risk_level, ph_level, turbidity, coliform_count")
        .order("risk_level", { ascending: false });
      if (data) setRegions(data as RegionData[]);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="glass-card rounded-lg border border-border/50 p-5 flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <h3 className="text-lg font-bold font-heading text-foreground mb-1">Regional Status</h3>
      <p className="text-xs text-muted-foreground mb-4">Water quality & disease metrics by district</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 font-semibold text-muted-foreground text-xs">Region</th>
              <th className="text-left py-2 px-2 font-semibold text-muted-foreground text-xs">Status</th>
              <th className="text-center py-2 px-2 font-semibold text-muted-foreground text-xs">pH</th>
              <th className="text-center py-2 px-2 font-semibold text-muted-foreground text-xs">Turbidity</th>
              <th className="text-center py-2 px-2 font-semibold text-muted-foreground text-xs">Coliform</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region, i) => {
              const sl = statusLabel[region.risk_level] || statusLabel.low;
              return (
                <motion.tr
                  key={region.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-2.5 px-2">
                    <p className="font-medium text-foreground">{region.name}</p>
                    <p className="text-xs text-muted-foreground">{region.state}</p>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sl.class}`}>
                      {sl.text}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs">{region.ph_level ?? "—"}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs">{region.turbidity ?? "—"} NTU</td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs font-semibold">{region.coliform_count ?? "—"}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionTable;
