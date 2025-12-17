import { useState, useEffect, useMemo } from "react";
import { Search, X, Heart, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { popularMangas, recentMangas, MangaData } from "@/data/mangaData";
import { Link } from "react-router-dom"; // Import Link for navigation

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  // Combine and deduplicate manga data
  const allMangas = useMemo(() => {
    const combined = [...popularMangas, ...recentMangas];
    const unique = combined.filter((manga, index, self) =>
      index === self.findIndex((m) => m.title === manga.title && m.chapter === manga.chapter)
    );
    return unique;
  }, []);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return allMangas.filter(
      (manga) =>
        manga.title.toLowerCase().includes(searchTerm) ||
        manga.author?.toLowerCase().includes(searchTerm) ||
        manga.category?.toLowerCase().includes(searchTerm) ||
        manga.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [query, allMangas]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Adjusted max-w for mobile and desktop */}
      <div className="relative w-full max-w-full sm:max-w-xl lg:max-w-2xl bg-card border border-border/50 rounded-xl shadow-2xl shadow-black/50 animate-scale-in overflow-hidden">
        
        {/* Search Input Bar - Clean, high-contrast area */}
        <div className="flex items-center px-4 py-3 border-b border-border/50">
          <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar mangás, autores..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
          {query.trim() === "" ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Digite para buscar...
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4">
              {results.map((manga, index) => (
                <SearchResultItem key={`${manga.id}-${index}`} manga={manga} onClose={onClose} />
              ))}
            </div>
          )}
        </div>

        {/* Footer hint - Hidden on mobile/tablet (hidden sm:block) */}
        <div className="px-4 py-3 border-t border-border/50 bg-secondary/30 hidden lg:block">
          <p className="text-xs text-muted-foreground text-center">
            Pressione <kbd className="px-1.5 py-0.5 bg-card rounded text-xs text-foreground border border-border/50">ESC</kbd> para fechar
          </p>
        </div>
      </div>
    </div>
  );
};

interface SearchResultItemProps {
  manga: MangaData;
  onClose: () => void;
}

const SearchResultItem = ({ manga, onClose }: SearchResultItemProps) => {
  // Função de tempo relativo simplificada
  const getRelativeTime = () => {
    if (!manga.lastUpdated) return null;
    const diffMs = new Date().getTime() - new Date(manga.lastUpdated).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return 'Mais de 1 semana';
  };

  return (
    <Link
      to={`/manga/${manga.slug}`}
      onClick={onClose}
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Cover Image */}
      <img
        src={manga.imageUrl}
        alt={manga.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      {/* Heart icon - Adjusted size/style */}
      <button className="absolute top-2 right-2 p-1 bg-black/50 rounded-full backdrop-blur-sm hover:bg-primary transition-colors">
        <Heart className="w-4 h-4 text-white/90" />
      </button>
      
      {/* Premium overlay - Adjusted size/style */}
      {manga.isPremium && (
        <div className="absolute top-2 left-2 p-1 bg-amber-500/80 rounded-full backdrop-blur-sm">
          <Crown className="w-4 h-4 text-amber-100 fill-amber-100" />
        </div>
      )}
      
      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Info at bottom - Adjusted font size for title */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h4 className="font-impact uppercase tracking-wide text-white text-xl sm:text-2xl line-clamp-2 leading-tight">
          {manga.title}
        </h4>
        {manga.lastUpdated && (
          <p className="text-xs text-white/80 mt-1">
            Atualizado {getRelativeTime()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default SearchModal;