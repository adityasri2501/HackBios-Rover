import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DetectedHazard {
  tag: string;
  confidence: number;
  bbox?: { x: number; y: number; width: number; height: number };
  notes: string;
}

const Safety = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    hazards: DetectedHazard[];
    annotatedImage?: string;
  } | null>(null);
  const [userNotes, setUserNotes] = useState("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!imageFile || !selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setAnalyzing(true);
      
      // Convert image to base64
      const base64Image = selectedImage.split(",")[1];

      const { data, error } = await supabase.functions.invoke("analyze-photo", {
        body: {
          image: base64Image,
          notes: userNotes,
        },
      });

      if (error) throw error;

      setAnalysis(data);
      toast.success("Image analyzed successfully");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image");
    } finally {
      setAnalyzing(false);
    }
  };

  const getSeverityColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-destructive";
    if (confidence >= 0.5) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Safety Photo Analysis</h1>
          <p className="text-muted-foreground">AI-powered hazard detection from site photos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Photo
              </h2>

              {!selectedImage ? (
                <label className="block">
                  <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center gap-4">
                    <Upload className="w-12 h-12 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-foreground font-medium mb-1">Click to upload photo</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={analysis?.annotatedImage || selectedImage}
                      alt="Selected"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setImageFile(null);
                      setAnalysis(null);
                      setUserNotes("");
                    }}
                    variant="outline"
                    className="w-full border-border"
                  >
                    Select Different Image
                  </Button>
                </div>
              )}
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Additional Notes</h3>
              <Textarea
                placeholder="Add any context or observations about this photo..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="min-h-32 bg-input border-border text-foreground"
              />
              
              <Button
                onClick={analyzeImage}
                disabled={!selectedImage || analyzing}
                className="w-full mt-4 bg-primary hover:bg-primary/90"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Analyze Photo
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Detected Hazards
              </h2>

              {!analysis ? (
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Upload and analyze a photo to see results</p>
                </div>
              ) : analysis.hazards.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <p className="text-foreground font-medium mb-1">No Hazards Detected</p>
                  <p className="text-sm text-muted-foreground">This photo appears safe</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysis.hazards.map((hazard, idx) => (
                    <div key={idx} className="p-4 bg-muted rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-5 h-5 ${getSeverityColor(hazard.confidence)}`} />
                          <span className="font-semibold text-foreground">{hazard.tag}</span>
                        </div>
                        <span className={`text-sm font-medium ${getSeverityColor(hazard.confidence)}`}>
                          {Math.round(hazard.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{hazard.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {analysis && analysis.hazards.length > 0 && (
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Risk Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Hazards:</span>
                    <span className="font-bold text-foreground">{analysis.hazards.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">High Risk:</span>
                    <span className="font-bold text-destructive">
                      {analysis.hazards.filter((h) => h.confidence >= 0.8).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Medium Risk:</span>
                    <span className="font-bold text-warning">
                      {analysis.hazards.filter((h) => h.confidence >= 0.5 && h.confidence < 0.8).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Low Risk:</span>
                    <span className="font-bold text-success">
                      {analysis.hazards.filter((h) => h.confidence < 0.5).length}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Safety;
