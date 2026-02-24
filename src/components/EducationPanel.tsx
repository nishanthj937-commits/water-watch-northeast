import { motion } from "framer-motion";
import { BookOpen, Shield, Droplets, Bug, Heart } from "lucide-react";

const resources = [
  {
    icon: Droplets,
    title: "Safe Water Practices",
    description: "Learn how to purify and store drinking water safely at home.",
    color: "bg-status-info/10 text-status-info",
  },
  {
    icon: Bug,
    title: "Identifying Symptoms",
    description: "Recognize early signs of cholera, typhoid, and dysentery.",
    color: "bg-status-danger/10 text-status-danger",
  },
  {
    icon: Shield,
    title: "Prevention Guidelines",
    description: "Steps to prevent waterborne disease spread in your community.",
    color: "bg-status-safe/10 text-status-safe",
  },
  {
    icon: Heart,
    title: "First Aid for Diarrhea",
    description: "ORS preparation and when to seek medical help immediately.",
    color: "bg-status-warning/10 text-status-warning",
  },
];

const EducationPanel = () => {
  return (
    <div className="glass-card rounded-lg border border-border/50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold font-heading text-foreground">Health Education</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resources.map((resource, i) => {
          const Icon = resource.icon;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:shadow-card-md transition-all text-left cursor-pointer hover:border-primary/20"
            >
              <div className={`rounded-lg p-2 ${resource.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{resource.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{resource.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default EducationPanel;
