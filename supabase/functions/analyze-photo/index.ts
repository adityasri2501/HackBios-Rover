import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, notes } = await req.json();
    
    console.log("Analyzing photo with AI...");
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Call Lovable AI for image analysis
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a mining safety expert AI. Analyze photos for safety hazards including missing PPE, structural issues, equipment problems, spills, and unsafe conditions. Return a JSON array of detected hazards with tag, confidence (0-1), and notes. Be thorough and specific.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this mining site photo for safety hazards. Additional context: ${notes || "None provided"}. Return ONLY a valid JSON object with this structure: {"hazards": [{"tag": "hazard name", "confidence": 0.85, "notes": "description"}]}`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${image}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";
    
    console.log("AI Response:", aiResponse);

    // Parse AI response
    let parsedResponse;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback to creating a response from the text
        parsedResponse = {
          hazards: [{
            tag: "General Safety Concern",
            confidence: 0.7,
            notes: aiResponse.substring(0, 200),
          }],
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      parsedResponse = {
        hazards: [{
          tag: "Analysis Required",
          confidence: 0.5,
          notes: "Manual review recommended",
        }],
      };
    }

    // Ensure hazards is an array
    const hazards = Array.isArray(parsedResponse.hazards) 
      ? parsedResponse.hazards 
      : [];

    return new Response(
      JSON.stringify({
        hazards,
        annotatedImage: `data:image/jpeg;base64,${image}`, // In production, would overlay bounding boxes
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-photo function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        hazards: [],
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
