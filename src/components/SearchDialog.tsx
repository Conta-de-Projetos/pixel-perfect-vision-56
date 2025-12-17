import React, { useState, useCallback, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // Importar toast

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // A lógica de busca é mantida, mas os resultados não são exibidos neste modal compacto.
  // Eles seriam exibidos em uma página de resultados separada ou em um modal maior.

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm("");
  }, []);
  
  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim()) {
      toast.info(`Buscando por: ${searchTerm}`);
      // Aqui você faria a navegação para a página de resultados
      onClose();
    } else {
      toast.warning("Digite um termo para buscar.");
    }
  }, [searchTerm, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        // Reduzindo o tamanho do modal para ser compacto e focado na busca
        className={cn(
          "sm:max-w-[600px] w-[95%] p-0 bg-background/95 backdrop-blur-lg border-border/50 shadow-2xl shadow-primary/10",
          "data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-10"
        )}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-impact tracking-wider text-primary gradient-text-blood">
            Pesquisar Mangás
          </DialogTitle>
        </DialogHeader>

        {/* Search Input Bar - Foco principal do modal */}
        <div className="p-6 pt-4">
          <div className="p-4 bg-card/50 border border-border/50 rounded-xl shadow-lg">
            <div className="flex gap-4 items-center">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Título do mangá..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  className={cn(
                    "h-12 w-full pl-10 pr-12 text-base font-medium bg-background/80 border border-border/80 rounded-lg",
                    "focus-visible:ring-primary focus-visible:border-primary/50 focus-visible:ring-1 transition-all duration-300 shadow-none"
                  )}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground hover:text-primary"
                    onClick={handleClear}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button 
                size="lg" 
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-display uppercase tracking-wider text-sm rounded-lg transition-all duration-300 flex-shrink-0"
                onClick={handleSearchSubmit}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Removendo a área de resultados para manter o modal compacto */}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;