import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = 'a-z' | 'rating' | 'recent' | 'views';

interface SortFilterControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption, label: string }[] = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'rating', label: 'Melhor Avaliados' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'views', label: 'Mais Vistos' },
];

const SortFilterControls = ({ currentSort, onSortChange }: SortFilterControlsProps) => {
  const activeLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'A-Z';

  // Função placeholder para o clique do filtro
  const handleFilterClick = () => {
    console.log("Abrir modal de filtro");
    // toast.info("Funcionalidade de filtro em desenvolvimento.");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Filter Icon */}
      <span 
        onClick={handleFilterClick}
        className="p-2 text-muted-foreground hover:text-primary cursor-pointer rounded-lg !transition-none duration-0"
        aria-label="Filtrar"
      >
        <Filter className="w-5 h-5" />
      </span>

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
    </div>
  );
};

export default SortFilterControls;