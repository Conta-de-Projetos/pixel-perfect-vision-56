import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className,
}: PaginationControlsProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <Button
        onClick={onPrevious}
        disabled={isFirstPage}
        variant="outline"
        className="bg-card/80 border-border/50 text-muted-foreground hover:bg-card hover:text-foreground font-display uppercase tracking-wide transition-all duration-300 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        Anterior
      </Button>
      
      <span className="text-sm font-medium text-foreground/80">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        onClick={onNext}
        disabled={isLastPage}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wide transition-all duration-300 group"
      >
        Próximo
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
};

export default PaginationControls;