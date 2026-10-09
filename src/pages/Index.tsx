import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Camera, Shield, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-header border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">MS</span>
            </div>
            <span className="text-header-foreground font-bold text-2xl">MineScan</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Mining Safety Platform</span>
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Advanced Safety Intelligence for Mining Operations
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Real-time hazard monitoring and AI-powered photo analysis to keep your sites safe
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/heatmap")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8"
            >
              <Activity className="w-5 h-5 mr-2" />
              View Heatmap
            </Button>
            <Button
              onClick={() => navigate("/safety")}
              size="lg"
              variant="outline"
              className="border-border text-lg px-8"
            >
              <Camera className="w-5 h-5 mr-2" />
              Analyze Photo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Risk Heatmap</h3>
            <p className="text-muted-foreground">
              Interactive map showing real-time hazard locations with color-coded severity levels
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">AI Photo Analysis</h3>
            <p className="text-muted-foreground">
              Upload site photos for instant AI-powered hazard detection and safety compliance checks
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Trend Analytics</h3>
            <p className="text-muted-foreground">
              Track safety metrics over time with filters for sites, areas, shifts, and categories
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to enhance site safety?</h2>
          <p className="text-muted-foreground mb-8">
            Start monitoring hazards and analyzing safety photos today
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/heatmap")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
