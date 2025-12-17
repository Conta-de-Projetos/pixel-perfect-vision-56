import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        className={cn(
          "sm:max-w-[600px] w-[95%] p-0 bg-background/90 backdrop-blur-xl border-2 border-border/50 shadow-2xl shadow-primary/20", // Increased definition and shadow
          "data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[data-state=closed]:slide-out-to-bottom-10"
        )}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-4xl font-impact tracking-wider text-primary gradient-text-blood">
            PESQUISAR MANGÁS
          </DialogTitle>
        </DialogHeader>

        {/* Search Input Bar - Foco principal do modal */}
        <div className="p-6 pt-4">
          {/* Input Container with defined border and background */}
          <div className="p-4 bg-card/70 border border-border/80 rounded-xl shadow-lg">
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
                  // Input field is now cleaner, using a darker background for contrast
                  className={cn(
                    "h-14 w-full pl-12 pr-12 text-base font-medium bg-background/70 rounded-xl",
                    "focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-2 transition-all duration-300 shadow-none border-none"
                  )}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 text-muted-foreground hover:text-primary"
                    onClick={handleClear}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-display uppercase tracking-wider text-base rounded-xl transition-all duration-300 flex-shrink-0 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                onClick={handleSearchSubmit}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;