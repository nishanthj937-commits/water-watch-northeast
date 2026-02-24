import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Droplets, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ReportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    waterSource: "",
    issue: "",
    description: "",
    symptoms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      description: "Your water quality report has been received. Thank you!",
    });
    setFormData({ location: "", waterSource: "", issue: "", description: "", symptoms: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-lg border border-border/50 p-5"
    >
      <h3 className="text-lg font-bold font-heading text-foreground mb-1">Report an Incident</h3>
      <p className="text-xs text-muted-foreground mb-4">Help us monitor water quality in your area</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Village, District"
                className="pl-9 text-sm"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Water Source</label>
            <div className="relative">
              <Droplets className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Well, River, Tap"
                className="pl-9 text-sm"
                value={formData.waterSource}
                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Issue Type</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            required
          >
            <option value="">Select issue...</option>
            <option value="color">Discolored Water</option>
            <option value="odor">Unusual Odor/Taste</option>
            <option value="illness">Health Symptoms</option>
            <option value="contamination">Visible Contamination</option>
            <option value="shortage">Water Shortage</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
          <Textarea
            placeholder="Describe the issue in detail..."
            className="text-sm min-h-[70px]"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <Button type="submit" className="w-full gradient-water text-primary-foreground font-semibold">
          <Send className="h-4 w-4 mr-2" />
          Submit Report
        </Button>
      </form>
    </motion.div>
  );
};

export default ReportForm;
