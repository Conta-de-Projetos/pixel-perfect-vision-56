import { Heart, Star, Crown, Lock } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useImageColor } from "@/hooks/useImageColor";
import { Link } from "react-router-dom"; // Importar Link

interface MangaCardProps {
  title: string;
  chapter: string;
  imageUrl: string;
  rating?: number; // Escala 0-10
  isNew?: boolean;
  isPremium?: boolean;
  type?: 'manga' | 'manhwa' | 'novel';
  author?: string;
  status?: 'ongoing' | 'completed' | 'hiatus';
  lastUpdated?: Date;
  synopsis?: string;
  simplified?: boolean;
  slug?: string; // Adicionar a propriedade slug
}

const MangaCard = ({ 
  title, 
  chapter, 
  imageUrl, 
  rating, 
  isNew,
  isPremium,
  author,
  slug, // Receber slug
}: MangaCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false);
  
  // Extract dominant color only for non-premium cards
  const dominantColor = useImageColor(imageUrl, !isPremium && !imageError);

  const formatRating = useCallback((r: number) => r.toFixed(1), []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (isPremium) {
      e.preventDefault(); // Previne a navegação se for premium
      setShowPremiumOverlay(prev => !prev);
    }
  }, [isPremium]);

  const handleFavoriteToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  }, []);

  // Dynamic border style for non-premium cards
  const hasDynamicBorder = !isPremium && dominantColor;
  const dynamicBorderStyle = hasDynamicBorder ? {
    boxShadow: `0 0 0 2px ${dominantColor}, 0 4px 20px -4px ${dominantColor}50`,
  } : {};

  const cardContent = (
    <div 
      className={cn(
        "relative aspect-[3/4] overflow-hidden bg-secondary shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-lg",
        isPremium 
          ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-background" 
          : !hasDynamicBorder && "border border-border/50 group-hover:shadow-primary/20"
      )}
      style={dynamicBorderStyle}
    >
      <img
        src={imageError ? '/placeholder.svg' : imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        onError={() => setImageError(true)}
      />
      
      {/* Minimal overlay for clean look */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Premium overlay with lock icon - only visible on click */}
      {isPremium && showPremiumOverlay && (
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center rounded-lg animate-fade-in">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-background/95 rounded-full shadow-lg animate-scale-in">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
          </div>
        </div>
      )}
      
      {/* Hover effect for desktop - only for premium cards */}
      {isPremium && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg hidden md:block">
          <div className="absolute inset-0 border-2 border-primary/50 rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        </div>
      )}
      
      {/* Top badges */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-start justify-between">
        {/* Left - Rating and NOVO below */}
        <div className="flex flex-col gap-1.5">
          {rating && (
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-card/90 backdrop-blur-sm border border-amber-500/30 rounded-lg shadow-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500" />
              <span className="text-xs sm:text-sm font-bold text-amber-500">{formatRating(rating)}</span>
            </div>
          )}
          {isNew && (
            <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-600 text-white text-[10px] sm:text-xs font-display uppercase tracking-wider shadow-lg rounded-lg w-fit">
              {['NOVO', 'HOT', 'TOP', 'UP'][Math.floor(Math.random() * 4)]}
            </div>
          )}
        </div>

        {/* Right - Crown */}
        {isPremium && (
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-xl shadow-lg shadow-amber-500/40">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-100" />
          </div>
        )}
      </div>

      {/* Favorite button - only on hover/desktop */}
      <button 
        onClick={handleFavoriteToggle}
        className="absolute bottom-2 right-2 p-1.5 sm:p-2 bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 shadow-lg rounded-lg hidden sm:block"
      >
        <Heart 
          className={cn(
            "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300",
            isFavorite ? "fill-primary text-primary scale-110" : "text-muted-foreground hover:scale-110"
          )} 
        />
      </button>
    </div>
  );

  return (
    <div 
      className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {slug ? (
        <Link to={`/manga/${slug}`} className="block">
          {/* Wrap children in a single div for Link */}
          <div> 
            {cardContent}
            {/* Title and chapter below card - simplified */}
            <div className="mt-2 sm:mt-3 space-y-0.5">
              <h3 className="text-xs sm:text-sm font-display uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                {title}
              </h3>
              
              <span className="text-[11px] sm:text-sm text-primary font-semibold tracking-wide block">
                {chapter}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <>
          {cardContent}
          {/* Title and chapter below card - simplified */}
          <div className="mt-2 sm:mt-3 space-y-0.5">
            <h3 className="text-xs sm:text-sm font-display uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
              {title}
            </h3>
            
            <span className="text-[11px] sm:text-sm text-primary font-semibold tracking-wide block">
              {chapter}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MangaCard;