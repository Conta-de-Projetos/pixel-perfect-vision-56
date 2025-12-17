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
        className={cn(
          "px-6 py-3 rounded-xl font-display uppercase tracking-wide transition-all duration-300 group",
          isFirstPage
            ? "bg-card/80 border border-border/50 text-muted-foreground cursor-not-allowed opacity-100" // Estilo desabilitado
            : "bg-card/80 border border-border/50 text-foreground hover:bg-card hover:border-primary/50" // Estilo ativo
        )}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
        Anterior
      </Button>
      
      <span className="text-sm font-medium text-foreground/80 hidden sm:block">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        onClick={onNext}
        disabled={isLastPage}
        className={cn(
          "px-6 py-3 rounded-xl font-display uppercase tracking-wide transition-all duration-300 group",
          isLastPage
            ? "bg-card/80 border border-border/50 text-muted-foreground cursor-not-allowed opacity-100" // Estilo desabilitado
            : "bg-primary text-primary-foreground hover:bg-primary/90" // Estilo ativo
        )}
      >
        Próximo
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
};

export default PaginationControls;