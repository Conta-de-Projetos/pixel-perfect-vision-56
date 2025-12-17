import React, { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    } else {
      toast.warning("Digite um termo para buscar.");
    }
  }, [searchTerm]);

  return (
    <div 
      className={cn(
        "relative flex items-center h-9 transition-all duration-300",
        isFocused ? "w-64" : "w-48" // Expande ao focar
      )}
    >
      <Search 
        className={cn(
          "absolute left-3 w-4 h-4 transition-colors duration-300",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} 
      />
      <input
        type="text"
        placeholder="Buscar títulos..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchSubmit();
          }
        }}
        className={cn(
          "h-full w-full pl-10 pr-10 text-sm font-medium bg-background/70 border border-border rounded-lg transition-all duration-300",
          "placeholder:text-muted-foreground focus:outline-none",
          // Estilo de foco brutalista
          "focus:border-primary focus:ring-1 focus:ring-primary/50 focus:shadow-md focus:shadow-primary/10"
        )}
      />
      {searchTerm && (
        <button 
          className="absolute right-1.5 p-1.5 text-muted-foreground hover:text-primary transition-colors duration-300 rounded-full"
          onClick={handleClear}
          aria-label="Limpar busca"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;