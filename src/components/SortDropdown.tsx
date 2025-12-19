import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, List, Grid3x3 } from "lucide-react";
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
      {/* Filter Icon (Placeholder for future filter modal) */}
      <Button variant="outline" size="icon" className="bg-card/80 border-border/50 text-muted-foreground hover:bg-card hover:text-primary">
        <Filter className="w-5 h-5" />
      </Button>

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
      
      {/* View Mode Toggles */}
      <div className="flex bg-card/80 border border-border/50 rounded-xl overflow-hidden">
        <Button 
          size="icon" 
          onClick={() => onViewChange('grid')}
          className={cn(
            "w-12 h-12 rounded-none transition-colors",
            currentView === 'grid' 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
          )}
        >
          <Grid3x3 className="w-5 h-5" />
        </Button>
        <Button 
          size="icon" 
          onClick={() => onViewChange('list')}
          className={cn(
            "w-12 h-12 rounded-none transition-colors",
            currentView === 'list' 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
          )}
        >
          <List className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default SortDropdown;