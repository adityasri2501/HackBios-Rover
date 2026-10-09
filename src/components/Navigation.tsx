import { Link, useLocation } from "react-router-dom";
import { Activity, Camera } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-header border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <span className="text-header-foreground font-bold text-xl">MineScan</span>
            </Link>
            
            <nav className="flex gap-1">
              <Link
                to="/heatmap"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive("/heatmap")
                    ? "bg-primary text-primary-foreground"
                    : "text-header-foreground hover:bg-secondary"
                }`}
              >
                <Activity className="w-4 h-4" />
                Risk Heatmap
              </Link>
              <Link
                to="/safety"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive("/safety")
                    ? "bg-primary text-primary-foreground"
                    : "text-header-foreground hover:bg-secondary"
                }`}
              >
                <Camera className="w-4 h-4" />
                Safety Analysis
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
