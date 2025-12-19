import { List, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = 'grid' | 'list';

interface ViewModeToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewModeToggle = ({ currentView, onViewChange }: ViewModeToggleProps) => {
  return (
    <div className="flex p-1 bg-card/80 border border-border/50 rounded-xl shadow-lg">
      <button 
        onClick={() => onViewChange('grid')}
        className={cn(
          "w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-lg",
          currentView === 'grid' 
            ? "bg-primary text-primary-foreground ring-2 ring-primary/50" 
            : "bg-transparent text-muted-foreground hover:bg-secondary/50"
        )}
        aria-label="Visualização em Grade"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>
      <button 
        onClick={() => onViewChange('list')}
        className={cn(
          "w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-lg",
          currentView === 'list' 
            ? "bg-primary text-primary-foreground ring-2 ring-primary/50" 
            : "bg-transparent text-muted-foreground hover:bg-secondary/50"
        )}
        aria-label="Visualização em Lista"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewModeToggle;