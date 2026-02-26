import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Activity, AlertTriangle, Users, Shield, Menu, X, Bell } from "lucide-react";
import StatCard from "@/components/StatCard";
import AlertPanel from "@/components/AlertPanel";
import { WaterQualityChart, DiseaseChart } from "@/components/HealthCharts";
import ReportForm from "@/components/ReportForm";
import EducationPanel from "@/components/EducationPanel";
import RegionTable from "@/components/RegionTable";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ sources: 0, alerts: 0, criticalAlerts: 0, reports: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [regionsRes, alertsRes, reportsRes] = await Promise.all([
        supabase.from("regions").select("water_sources"),
        supabase.from("alerts").select("severity").eq("is_active", true),
        supabase.from("incident_reports").select("id", { count: "exact", head: true }),
      ]);
      const totalSources = (regionsRes.data || []).reduce((sum, r) => sum + (r.water_sources || 0), 0);
      const activeAlerts = alertsRes.data || [];
      setStats({
        sources: totalSources,
        alerts: activeAlerts.length,
        criticalAlerts: activeAlerts.filter((a) => a.severity === "critical").length,
        reports: reportsRes.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="gradient-water rounded-xl p-2">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold font-heading text-foreground leading-tight">
                JalRaksha <span className="hidden sm:inline text-primary">EWS</span>
              </h1>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Community Health Monitoring · NE India
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {["Dashboard", "Reports", "Map", "Education"].map((item, i) => (
              <button
                key={item}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  i === 0
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {stats.criticalAlerts > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-status-danger animate-pulse-gentle" />
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-border px-4 py-2"
          >
            {["Dashboard", "Reports", "Map", "Education"].map((item, i) => (
              <button
                key={item}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero Banner */}
      <div className="gradient-water">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-primary-foreground">
                Early Warning Dashboard
              </h2>
              <p className="text-sm text-primary-foreground/80 mt-0.5">
                Real-time monitoring of water quality & disease outbreaks across Northeast India
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-status-safe animate-pulse-gentle" />
                Live Monitoring
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Water Sources Monitored"
            value={stats.sources.toLocaleString()}
            change="Live from database"
            trend="up"
            icon={<Droplets className="h-5 w-5" />}
            status="info"
          />
          <StatCard
            title="Incident Reports"
            value={stats.reports}
            change="Community submitted"
            trend="up"
            icon={<Activity className="h-5 w-5" />}
            status="warning"
          />
          <StatCard
            title="Active Alerts"
            value={stats.alerts}
            change={`${stats.criticalAlerts} critical`}
            trend="up"
            icon={<AlertTriangle className="h-5 w-5" />}
            status="danger"
          />
          <StatCard
            title="Regions Covered"
            value="8"
            change="NE India states"
            trend="up"
            icon={<Users className="h-5 w-5" />}
            status="safe"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WaterQualityChart />
          <DiseaseChart />
        </div>

        {/* Alerts + Report Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AlertPanel />
          <ReportForm />
        </div>

        {/* Region Table */}
        <RegionTable />

        {/* Education */}
        <EducationPanel />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>JalRaksha EWS — Smart Community Health Monitoring</span>
            </div>
            <p>Designed for Rural Northeast India · Powered by Lovable Cloud</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
