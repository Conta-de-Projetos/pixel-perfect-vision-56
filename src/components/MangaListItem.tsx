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

  // Mapeamento de status para texto e cor
  const statusText = manga.status === 'ongoing' ? 'Em andamento' : manga.status === 'completed' ? 'Concluído' : 'Hiato';
  const statusClass = manga.status === 'ongoing' ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/50" : "bg-muted/50 text-muted-foreground";

  return (
    <Link 
      to={`/manga/${manga.slug}`}
      className="flex items-start p-3 sm:p-4 bg-card/80 border border-border/50 rounded-xl shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300 group brutal-card relative"
    >
      {/* Rating Badge (Top Right Corner) */}
      {manga.rating && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-lg shadow-lg group-hover:bg-primary/10 transition-colors">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm font-bold text-primary">{formatRating(manga.rating)}</span>
        </div>
      )}

      {/* Cover Image (Small) */}
      <div className="flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden rounded-md relative mr-4 sm:mr-6">
        <img 
          src={manga.imageUrl} 
          alt={manga.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0 pt-1 pb-1">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-impact tracking-wider text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 leading-tight">
          {manga.title.toUpperCase()}
        </h3>
        
        {/* Chapter */}
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {manga.chapter}
        </p>
        
        {/* Author */}
        <p className="text-xs sm:text-sm text-muted-foreground/70 mb-3">
          {manga.author || 'Autor Desconhecido'}
        </p>
        
        {/* Badges Row (Bottom) */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          
          {/* Type Badge */}
          <Badge 
            variant="secondary" 
            className="text-[10px] px-2 py-0.5 font-display uppercase tracking-wide bg-secondary/50 text-foreground/80"
          >
            {manga.type || 'Mangá'}
          </Badge>
          
          {/* Status Badge */}
          <Badge 
            variant="secondary" 
            className={cn(
              "text-[10px] px-2 py-0.5 font-display uppercase tracking-wide",
              statusClass
            )}
          >
            {statusText}
          </Badge>
          
          {/* Premium Badge */}
          {manga.isPremium && (
            <Badge 
              className="text-[10px] px-2 py-0.5 font-display uppercase tracking-wide bg-amber-600 text-amber-100 hover:bg-amber-600/90"
            >
              Premium
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MangaListItem;