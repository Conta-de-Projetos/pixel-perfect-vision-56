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
          "sm:max-w-[600px] w-[95%] p-0 bg-background/95 backdrop-blur-xl border-2 border-border/50 shadow-2xl shadow-primary/20",
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
          {/* Combined Input and Button Container matching the image design */}
          <div className="flex items-center bg-card border border-border/80 rounded-xl shadow-lg overflow-hidden">
            
            {/* Input Area */}
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
                // Input styling: transparent background, no border/ring, large padding for icon
                className={cn(
                  "h-14 w-full pl-12 pr-4 text-base font-medium bg-transparent border-none shadow-none",
                  "focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none"
                )}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              {/* Removed Clear Button logic for simplicity and to match image */}
            </div>
            
            {/* Button Area - Dark Red background (blood-dark) */}
            <Button 
              size="lg" 
              className="h-14 px-8 bg-blood-dark hover:bg-primary text-primary-foreground font-display uppercase tracking-wider text-base rounded-none transition-all duration-300 flex-shrink-0 active:scale-[0.98] hover:shadow-lg hover:shadow-primary/30"
              onClick={handleSearchSubmit}
            >
              BUSCAR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;