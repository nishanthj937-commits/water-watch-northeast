import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const waterQualityData = [
  { month: "Jan", pH: 7.1, turbidity: 2.1, coliform: 5, safe: 95 },
  { month: "Feb", pH: 7.0, turbidity: 1.8, coliform: 3, safe: 97 },
  { month: "Mar", pH: 6.9, turbidity: 2.5, coliform: 8, safe: 92 },
  { month: "Apr", pH: 6.8, turbidity: 3.2, coliform: 12, safe: 88 },
  { month: "May", pH: 7.2, turbidity: 4.1, coliform: 18, safe: 82 },
  { month: "Jun", pH: 6.5, turbidity: 6.8, coliform: 35, safe: 65 },
  { month: "Jul", pH: 6.3, turbidity: 8.2, coliform: 42, safe: 58 },
  { month: "Aug", pH: 6.4, turbidity: 7.5, coliform: 38, safe: 62 },
  { month: "Sep", pH: 6.7, turbidity: 5.1, coliform: 22, safe: 78 },
  { month: "Oct", pH: 7.0, turbidity: 3.0, coliform: 10, safe: 90 },
  { month: "Nov", pH: 7.1, turbidity: 2.2, coliform: 6, safe: 94 },
  { month: "Dec", pH: 7.2, turbidity: 1.9, coliform: 4, safe: 96 },
];

const diseaseData = [
  { month: "Jan", cholera: 2, typhoid: 5, dysentery: 8, hepatitisA: 1 },
  { month: "Feb", cholera: 1, typhoid: 3, dysentery: 6, hepatitisA: 0 },
  { month: "Mar", cholera: 3, typhoid: 7, dysentery: 10, hepatitisA: 2 },
  { month: "Apr", cholera: 5, typhoid: 9, dysentery: 14, hepatitisA: 3 },
  { month: "May", cholera: 8, typhoid: 12, dysentery: 18, hepatitisA: 4 },
  { month: "Jun", cholera: 18, typhoid: 22, dysentery: 30, hepatitisA: 8 },
  { month: "Jul", cholera: 25, typhoid: 28, dysentery: 35, hepatitisA: 11 },
  { month: "Aug", cholera: 22, typhoid: 25, dysentery: 32, hepatitisA: 9 },
  { month: "Sep", cholera: 12, typhoid: 15, dysentery: 20, hepatitisA: 5 },
  { month: "Oct", cholera: 6, typhoid: 8, dysentery: 12, hepatitisA: 3 },
  { month: "Nov", cholera: 3, typhoid: 4, dysentery: 7, hepatitisA: 1 },
  { month: "Dec", cholera: 1, typhoid: 3, dysentery: 5, hepatitisA: 1 },
];

const WaterQualityChart = () => {
  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <h3 className="text-lg font-bold font-heading text-foreground mb-1">Water Quality Index</h3>
      <p className="text-xs text-muted-foreground mb-4">% of sources meeting safe drinking standards</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={waterQualityData}>
          <defs>
            <linearGradient id="safeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 14%, 88%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 46%)" />
          <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 46%)" />
          <Tooltip
            contentStyle={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(160, 14%, 88%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="safe"
            stroke="hsl(152, 60%, 42%)"
            strokeWidth={2.5}
            fill="url(#safeGradient)"
            name="Safe Sources %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const DiseaseChart = () => {
  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <h3 className="text-lg font-bold font-heading text-foreground mb-1">Disease Incidence</h3>
      <p className="text-xs text-muted-foreground mb-4">Monthly reported cases by disease type</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={diseaseData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 14%, 88%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 46%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 46%)" />
          <Tooltip
            contentStyle={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(160, 14%, 88%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="cholera" fill="hsl(0, 72%, 51%)" radius={[2, 2, 0, 0]} name="Cholera" />
          <Bar dataKey="typhoid" fill="hsl(38, 92%, 55%)" radius={[2, 2, 0, 0]} name="Typhoid" />
          <Bar dataKey="dysentery" fill="hsl(205, 78%, 50%)" radius={[2, 2, 0, 0]} name="Dysentery" />
          <Bar dataKey="hepatitisA" fill="hsl(174, 62%, 28%)" radius={[2, 2, 0, 0]} name="Hepatitis A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { WaterQualityChart, DiseaseChart };
