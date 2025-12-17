import React, { useState, useCallback, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MangaCard from "./MangaCard";
import { allMangas, MangaData } from "@/data/mangaData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseTerm = searchTerm.toLowerCase();
    return allMangas.filter(manga => 
      manga.title.toLowerCase().includes(lowerCaseTerm) ||
      manga.tags?.some(tag => tag.toLowerCase().includes(lowerCaseTerm))
    ).slice(0, 12); // Limita a 12 resultados para performance
  }, [searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "sm:max-w-[800px] w-[95%] h-[90vh] p-0 bg-background/95 backdrop-blur-lg border-border/50 shadow-2xl shadow-primary/10",
          "data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-10"
        )}
      >
        <DialogHeader className="p-6 border-b border-border/50">
          <DialogTitle className="text-3xl font-impact tracking-wider text-primary gradient-text-blood">
            Pesquisar Mangás
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Digite o título do mangá que está procurando
          </p>
        </DialogHeader>

        {/* Search Input Bar */}
        <div className="p-6 pt-0">
          <div className="flex gap-4 items-center">
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Título do mangá..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={cn(
                  "h-14 w-full pl-4 pr-12 text-base font-medium bg-card/80 border-2 border-border/80 rounded-xl shadow-brutal",
                  "focus-visible:ring-primary focus-visible:border-primary/50 focus-visible:shadow-brutal-hover transition-all duration-300"
                )}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground hover:text-primary"
                  onClick={handleClear}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button 
              size="lg" 
              className="h-14 px-8 bg-orange-600 hover:bg-orange-700 text-white font-display uppercase tracking-wider text-base rounded-xl shadow-brutal hover:shadow-brutal-hover transition-all duration-300"
              onClick={() => toast.info(`Buscando por: ${searchTerm}`)}
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Results Area */}
        <ScrollArea className="flex-grow px-6 pb-6 h-full">
          <div className="h-full">
            {searchTerm.length > 0 && filteredResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredResults.map((manga) => (
                  <MangaCard
                    key={manga.id}
                    title={manga.title}
                    chapter={manga.chapter}
                    imageUrl={manga.imageUrl}
                    rating={manga.rating}
                    isNew={manga.isNew}
                    isPremium={manga.isPremium}
                    slug={manga.slug}
                    simplified
                  />
                ))}
              </div>
            ) : searchTerm.length > 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-4 text-border" />
                <p className="text-lg font-display uppercase tracking-wide">Nenhum resultado encontrado para "{searchTerm}"</p>
                <p className="text-sm mt-2">Tente termos de busca diferentes ou verifique a ortografia.</p>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-display uppercase tracking-wide">Comece a digitar para ver os resultados</p>
                <p className="text-sm mt-2">Busque por título, autor ou tags.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;