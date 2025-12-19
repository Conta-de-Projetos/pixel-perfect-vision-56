import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, List, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = 'a-z' | 'rating' | 'recent' | 'views';
type ViewMode = 'grid' | 'list';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const sortOptions: { value: SortOption, label: string }[] = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'rating', label: 'Melhor Avaliados' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'views', label: 'Mais Vistos' },
];

const SortDropdown = ({ currentSort, onSortChange, currentView, onViewChange }: SortDropdownProps) => {
  const activeLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'A-Z';

  return (
    <div className="flex items-center gap-3">
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-card/80 border-border/50 text-foreground hover:bg-card hover:border-primary/50 font-display uppercase tracking-wide px-4"
          >
            {activeLabel}
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-xl">
          {sortOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={cn(
                "cursor-pointer text-sm font-medium transition-colors font-display uppercase tracking-wide",
                currentSort === option.value
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* View Mode Toggles - Exact match to reference image */}
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
            "w-10 h-10 flex items-center justify-center transition-colors rounded-lg",
            currentView === 'list' 
              ? "bg-primary text-primary-foreground ring-2 ring-primary/50" 
              : "bg-transparent text-muted-foreground hover:bg-secondary/50"
          )}
          aria-label="Visualização em Lista"
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SortDropdown;