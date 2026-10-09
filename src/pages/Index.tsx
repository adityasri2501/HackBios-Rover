import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROVER_URL } from "@/lib/rover";
import { AlertTriangle, Camera, Shield, Bot, ExternalLink } from "lucide-react";


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
              onClick={() => navigate("/safety")}
              size="lg"
              variant="outline"
              className="border-border text-lg px-8"
            >
              <Camera className="w-5 h-5 mr-2" />
              Analyze Photo
            </Button>
            <a
              href={ROVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 text-lg font-medium h-11 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open Rover dashboard in a new tab"
            >
              <Bot className="w-5 h-5 mr-2" />
              Rover
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">PPE &amp; Worker Safety</h3>
            <p className="text-muted-foreground">
              Spot visible gaps in protective equipment, including helmets and high-visibility gear.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Site &amp; Equipment Hazards</h3>
            <p className="text-muted-foreground">
              Review photos for spills, unsafe equipment, structural concerns, and other visible risks.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">AI-Assisted Photo Review</h3>
            <p className="text-muted-foreground">
              Add site context, analyze a photo, and review detected concerns with confidence scores.
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
