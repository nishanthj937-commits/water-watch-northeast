import { motion } from "framer-motion";

interface RegionData {
  name: string;
  state: string;
  status: "safe" | "warning" | "danger";
  pH: number;
  turbidity: number;
  cases: number;
}

const regions: RegionData[] = [
  { name: "Guwahati", state: "Assam", status: "safe", pH: 7.1, turbidity: 1.8, cases: 2 },
  { name: "Shillong", state: "Meghalaya", status: "safe", pH: 7.0, turbidity: 2.1, cases: 1 },
  { name: "Morigaon", state: "Assam", status: "danger", pH: 6.2, turbidity: 8.5, cases: 18 },
  { name: "Dimapur", state: "Nagaland", status: "warning", pH: 6.6, turbidity: 5.2, cases: 7 },
  { name: "Silchar", state: "Assam", status: "danger", pH: 6.3, turbidity: 7.8, cases: 15 },
  { name: "Imphal", state: "Manipur", status: "warning", pH: 6.7, turbidity: 4.5, cases: 5 },
  { name: "Agartala", state: "Tripura", status: "safe", pH: 7.2, turbidity: 1.5, cases: 0 },
  { name: "Aizawl", state: "Mizoram", status: "safe", pH: 7.0, turbidity: 2.0, cases: 1 },
];

const statusLabel = {
  safe: { text: "Safe", class: "status-safe" },
  warning: { text: "At Risk", class: "status-warning" },
  danger: { text: "Critical", class: "status-danger" },
};

const RegionTable = () => {
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
              <th className="text-center py-2 px-2 font-semibold text-muted-foreground text-xs">Cases</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region, i) => (
              <motion.tr
                key={region.name}
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
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel[region.status].class}`}>
                    {statusLabel[region.status].text}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-center font-mono text-xs">{region.pH}</td>
                <td className="py-2.5 px-2 text-center font-mono text-xs">{region.turbidity} NTU</td>
                <td className="py-2.5 px-2 text-center font-mono text-xs font-semibold">{region.cases}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionTable;
