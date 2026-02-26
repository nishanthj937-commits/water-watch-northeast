
-- Create enum for alert severity
CREATE TYPE public.alert_severity AS ENUM ('critical', 'warning', 'info', 'resolved');

-- Create enum for water issue types
CREATE TYPE public.water_issue_type AS ENUM ('color', 'odor', 'illness', 'contamination', 'shortage', 'other');

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Regions table (reference data)
CREATE TABLE public.regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  population INTEGER,
  water_sources INTEGER DEFAULT 0,
  ph_level NUMERIC(4,2),
  turbidity NUMERIC(6,2),
  coliform_count INTEGER DEFAULT 0,
  risk_level TEXT DEFAULT 'low',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Regions are viewable by everyone" ON public.regions FOR SELECT USING (true);

-- Incident reports table (public reporting - no auth required)
CREATE TABLE public.incident_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  water_source TEXT NOT NULL,
  issue_type water_issue_type NOT NULL DEFAULT 'other',
  description TEXT NOT NULL,
  symptoms TEXT,
  reporter_name TEXT,
  reporter_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  region_id UUID REFERENCES public.regions(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit incident reports" ON public.incident_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Incident reports are viewable by everyone" ON public.incident_reports FOR SELECT USING (true);

-- Water quality readings table
CREATE TABLE public.water_quality_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region_id UUID REFERENCES public.regions(id) NOT NULL,
  ph_level NUMERIC(4,2),
  turbidity NUMERIC(6,2),
  coliform_count INTEGER,
  arsenic_level NUMERIC(8,4),
  fluoride_level NUMERIC(6,3),
  is_safe BOOLEAN DEFAULT true,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.water_quality_readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Water readings are viewable by everyone" ON public.water_quality_readings FOR SELECT USING (true);

-- Alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  severity alert_severity NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  location TEXT NOT NULL,
  region_id UUID REFERENCES public.regions(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Alerts are viewable by everyone" ON public.alerts FOR SELECT USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON public.regions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_incident_reports_updated_at BEFORE UPDATE ON public.incident_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for alerts
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;

-- Seed regions data for Northeast India
INSERT INTO public.regions (name, state, district, population, water_sources, ph_level, turbidity, coliform_count, risk_level) VALUES
  ('Morigaon', 'Assam', 'Morigaon', 957423, 145, 6.5, 8.2, 42, 'high'),
  ('Dimapur', 'Nagaland', 'Dimapur', 378811, 89, 6.9, 4.1, 15, 'medium'),
  ('Silchar', 'Assam', 'Cachar', 228985, 112, 7.0, 3.5, 18, 'medium'),
  ('Shillong', 'Meghalaya', 'East Khasi Hills', 354759, 167, 7.2, 1.9, 4, 'low'),
  ('Imphal', 'Manipur', 'Imphal West', 264986, 98, 7.1, 2.8, 8, 'low'),
  ('Agartala', 'Tripura', 'West Tripura', 400004, 134, 6.8, 5.2, 25, 'medium'),
  ('Aizawl', 'Mizoram', 'Aizawl', 293416, 76, 7.3, 1.5, 3, 'low'),
  ('Itanagar', 'Arunachal Pradesh', 'Papum Pare', 59028, 45, 7.0, 3.8, 12, 'medium');

-- Seed alerts
INSERT INTO public.alerts (severity, title, message, location) VALUES
  ('critical', 'E. coli Detected — Morigaon District', 'Water sample from community well shows E. coli levels 3x above safe limit.', 'Morigaon, Assam'),
  ('warning', 'Turbidity Rising — Dimapur', 'Turbidity levels approaching threshold after heavy rainfall.', 'Dimapur, Nagaland'),
  ('warning', 'Cholera Cases Reported — Silchar', '3 new suspected cholera cases in Silchar subdivision.', 'Silchar, Assam'),
  ('resolved', 'Water Quality Restored — Shillong', 'Chlorination treatment completed. Water now safe for consumption.', 'Shillong, Meghalaya');
