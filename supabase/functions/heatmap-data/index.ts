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
    const { filters } = await req.json();
    
    console.log("Fetching heatmap data with filters:", filters);

    // Mock hazard data - in production, this would query a database
    const mockHazards = [
      {
        id: "HZ001",
        lat: -25.9461,
        lng: 28.1881,
        severity: "high",
        category: "PPE Violations",
        site: "Site A",
        area: "Open Pit",
        shift: "Day Shift",
        date: "2025-11-15",
        description: "Worker observed without hard hat in active zone",
      },
      {
        id: "HZ002",
        lat: -25.9471,
        lng: 28.1891,
        severity: "medium",
        category: "Equipment Issues",
        site: "Site A",
        area: "Processing Plant",
        shift: "Night Shift",
        date: "2025-11-14",
        description: "Hydraulic leak detected on excavator #5",
      },
      {
        id: "HZ003",
        lat: -25.9481,
        lng: 28.1871,
        severity: "high",
        category: "Structural Concerns",
        site: "Site B",
        area: "Underground",
        shift: "Day Shift",
        date: "2025-11-15",
        description: "Crack observed in tunnel support beam",
      },
      {
        id: "HZ004",
        lat: -25.9451,
        lng: 28.1861,
        severity: "low",
        category: "Spills/Leaks",
        site: "Site A",
        area: "Processing Plant",
        shift: "Day Shift",
        date: "2025-11-13",
        description: "Minor oil spill contained in maintenance area",
      },
      {
        id: "HZ005",
        lat: -25.9491,
        lng: 28.1901,
        severity: "medium",
        category: "PPE Violations",
        site: "Site C",
        area: "Open Pit",
        shift: "Night Shift",
        date: "2025-11-12",
        description: "Multiple workers without safety vests observed",
      },
      {
        id: "HZ006",
        lat: -25.9441,
        lng: 28.1851,
        severity: "high",
        category: "Equipment Issues",
        site: "Site B",
        area: "Underground",
        shift: "Day Shift",
        date: "2025-11-16",
        description: "Conveyor belt emergency stop malfunction",
      },
      {
        id: "HZ007",
        lat: -25.9501,
        lng: 28.1911,
        severity: "low",
        category: "Structural Concerns",
        site: "Site A",
        area: "Open Pit",
        shift: "Day Shift",
        date: "2025-11-11",
        description: "Minor erosion detected on access ramp",
      },
      {
        id: "HZ008",
        lat: -25.9431,
        lng: 28.1841,
        severity: "medium",
        category: "Spills/Leaks",
        site: "Site C",
        area: "Processing Plant",
        shift: "Night Shift",
        date: "2025-11-15",
        description: "Chemical storage drum showing signs of corrosion",
      },
    ];

    // Apply filters
    let filteredHazards = mockHazards;

    if (filters.site !== "all") {
      filteredHazards = filteredHazards.filter((h) => 
        h.site.toLowerCase().includes(filters.site.toLowerCase().replace("-", " "))
      );
    }

    if (filters.area !== "all") {
      filteredHazards = filteredHazards.filter((h) => 
        h.area.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    if (filters.shift !== "all") {
      filteredHazards = filteredHazards.filter((h) => 
        h.shift.toLowerCase().includes(filters.shift.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      filteredHazards = filteredHazards.filter((h) => 
        h.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    return new Response(
      JSON.stringify({ hazards: filteredHazards }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in heatmap-data function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
