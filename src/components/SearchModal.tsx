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

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl shadow-primary/20 animate-scale-in overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
          <Search className="w-5 h-5 text-primary shrink-0" />
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
            className="p-1 hover:bg-primary/20 rounded-lg transition-colors text-muted-foreground hover:text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-muted-foreground text-sm font-display uppercase tracking-wide">
              Digite o título, autor ou tag para começar a busca...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm font-display uppercase tracking-wide">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
              {results.map((manga, index) => (
                <SearchResultItem key={`${manga.id}-${index}`} manga={manga} onClose={onClose} />
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-border bg-secondary/30">
          <p className="text-xs text-muted-foreground text-center font-display uppercase tracking-wide">
            Pressione <kbd className="px-1.5 py-0.5 bg-card rounded text-xs text-foreground border border-border">ESC</kbd> para fechar
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
      
      {/* Heart icon */}
      <button className="absolute top-2 right-2 p-1 bg-black/50 rounded-full backdrop-blur-sm hover:bg-primary transition-colors">
        <Heart className="w-4 h-4 text-white/90" />
      </button>
      
      {/* Premium overlay */}
      {manga.isPremium && (
        <div className="absolute top-2 left-2 p-1 bg-amber-500/80 rounded-full backdrop-blur-sm">
          <Crown className="w-4 h-4 text-amber-100 fill-amber-100" />
        </div>
      )}
      
      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Info at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h4 className="font-impact uppercase tracking-wide text-white text-sm line-clamp-2 leading-tight">
          {manga.title}
        </h4>
        {manga.chapter && (
          <p className="text-xs text-primary font-semibold mt-1">
            {manga.chapter}
          </p>
        )}
        {manga.lastUpdated && (
          <p className="text-[10px] text-white/60 mt-0.5">
            Atualizado {getRelativeTime()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default SearchModal;