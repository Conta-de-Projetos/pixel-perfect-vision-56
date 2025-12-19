import { Link } from "react-router-dom";
import { MangaData, getRelativeTime } from "@/data/mangaData";
import { cn } from "@/lib/utils";
import { Star, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MangaListItemProps {
  manga: MangaData;
}

const MangaListItem = ({ manga }: MangaListItemProps) => {
  const formatRating = (r: number | undefined) => r ? r.toFixed(1) : "N/A";

  return (
    <Link 
      to={`/manga/${manga.slug}`}
      className="flex items-center p-3 sm:p-4 bg-card/80 border border-border/50 rounded-xl shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300 group brutal-card"
    >
      {/* Cover Image (Small) */}
      <div className="flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden rounded-md relative mr-4 sm:mr-6">
        <img 
          src={manga.imageUrl} 
          alt={manga.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {manga.isPremium && (
          <Crown className="absolute top-1 right-1 w-4 h-4 text-amber-100 fill-amber-500" />
        )}
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-base sm:text-lg font-display uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {manga.title}
        </h3>
        
        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm text-muted-foreground">
          
          {/* Latest Chapter */}
          <span className="font-medium text-primary">
            {manga.chapter}
          </span>
          
          {/* Last Updated */}
          {manga.lastUpdated && (
            <span className="hidden sm:inline-block">
              • {getRelativeTime(manga.lastUpdated)}
            </span>
          )}
          
          {/* Status Badge (Mobile hidden) */}
          <Badge 
            variant="secondary" 
            className={cn(
              "hidden md:inline-flex text-[10px] px-2 py-0.5 font-display uppercase tracking-wide",
              manga.status === 'ongoing' ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/50" : "bg-muted/50 text-muted-foreground"
            )}
          >
            {manga.status === 'ongoing' ? 'Em Andamento' : 'Concluído'}
          </Badge>
        </div>
        
        {/* Tags (Removed) */}
      </div>

      {/* Rating (Right side) */}
      {manga.rating && (
        <div className="flex-shrink-0 flex items-center gap-1 ml-4 text-sm sm:text-base text-amber-500 font-display uppercase tracking-wide">
          <Star className="w-4 h-4 sm:w-5 h-5 fill-amber-500" />
          <span className="font-semibold">{formatRating(manga.rating)}</span>
        </div>
      )}
    </Link>
  );
};

export default MangaListItem;