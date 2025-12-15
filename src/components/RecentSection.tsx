import { useState } from "react";
import MangaCard from "./MangaCard";
import ScrollRevealCard from "./ScrollRevealCard";
import { Clock, Sparkles } from "lucide-react";
import { recentMangas } from "@/data/mangaData";
import { cn } from "@/lib/utils";
import BulletIcon from "./BulletIcon";
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile
import { useDragScroll } from "@/hooks/useDragScroll"; // Import useDragScroll
import { // Import DropdownMenu components
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryTags = [
  "Todos", "4-Koma", "Ação", "Adaptação", "Aventura", "Aliens", "Animais", 
  "Award Winning", "Boys' Love", "Comédia", "Drama", "Fantasia", "Girls' Love",
  "Horror", "Isekai", "Mistério", "Romance", "Sci-Fi", "Seinen", "Shoujo", 
  "Shounen", "Slice of Life", "Sobrenatural", "Thriller"
];

const RecentSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [splashKey, setSplashKey] = useState(0);
  const [triggerBulletAnimation, setTriggerBulletAnimation] = useState(false);
  const isMobile = useIsMobile(); // Use the hook
  const dragScrollRef = useDragScroll<HTMLDivElement>(); // Use the drag scroll hook

  const filteredMangas = activeCategory === "Todos" 
    ? recentMangas 
    : recentMangas.filter((manga) => 
        manga.category === activeCategory || 
        (activeCategory === "Ação" && manga.type === "manga") ||
        (activeCategory === "Manhwa" && manga.type === "manhwa")
      );

  const handlePress = () => {
    setTriggerBulletAnimation(true);
    setTimeout(() => setTriggerBulletAnimation(false), 300);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSplashKey((prev) => prev + 1);
  };

  return (
    <section id="lancamentos" className="relative py-16 sm:py-24 px-4 grunge-texture overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      
      {/* Blood line top with glow */}
      <div className="relative max-w-4xl mx-auto mb-10 sm:mb-16">
        <div className="blood-line" />
        <div className="absolute inset-0 blood-line blur-sm opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 animate-fade-up">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300 rounded-lg">
              <Clock className="w-5 h-5 sm:w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-impact tracking-wider">
                RECENTEMENTE ATUALIZADOS
              </h2>
              <Sparkles className="w-4 h-4 sm:w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Horizontal Category Tags Bar */}
        <div className="relative mb-10 sm:mb-8 -mx-4 sm:mx-0">
          <div 
            ref={dragScrollRef} // Apply drag scroll ref here
            className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-0 cursor-grab" // Added cursor-grab
          >
            {/* "Todos" button with conditional rendering for DropdownMenu */}
            {!isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-display uppercase tracking-wider transition-all duration-300 whitespace-nowrap overflow-hidden",
                      "focus-visible:outline-none focus-visible:ring-0", // Adicionado para remover a borda branca
                      activeCategory === "Todos"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card active:scale-95"
                    )}
                  >
                    <span className="relative z-10">Todos</span>
                    {activeCategory === "Todos" && (
                      <div key={splashKey} className="absolute inset-0 pointer-events-none overflow-visible">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-[scale-in_0.3s_ease-out]" />
                        <div 
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-[fade-in_0.2s_ease-out]"
                          style={{ transform: 'translate(-50%, -50%) translate(-12px, -8px)' }}
                        />
                        <div 
                          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary/50 rounded-full animate-[fade-in_0.3s_ease-out]"
                          style={{ transform: 'translate(-50%, -50%) translate(10px, -6px)' }}
                        />
                        <div 
                          className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/40 rounded-full animate-[fade-in_0.4s_ease-out]"
                          style={{ transform: 'translate(-50%, -50%) translate(8px, 8px)' }}
                        />
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                  <div className="grid grid-cols-3 gap-2">
                    {categoryTags.map((category) => (
                      <DropdownMenuItem 
                        key={category} 
                        onClick={() => handleCategoryClick(category)}
                        className={cn(
                          "cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors justify-center text-center",
                          activeCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => handleCategoryClick("Todos")}
                className={cn(
                  "relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-display uppercase tracking-wider transition-all duration-300 whitespace-nowrap overflow-hidden",
                  "focus-visible:outline-none focus-visible:ring-0", // Adicionado para remover a borda branca
                  activeCategory === "Todos"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card active:scale-95"
                )}
              >
                <span className="relative z-10">Todos</span>
                {activeCategory === "Todos" && (
                  <div key={splashKey} className="absolute inset-0 pointer-events-none overflow-visible">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-[scale-in_0.3s_ease-out]" />
                    <div 
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-[fade-in_0.2s_ease-out]"
                      style={{ transform: 'translate(-50%, -50%) translate(-12px, -8px)' }}
                    />
                    <div 
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary/50 rounded-full animate-[fade-in_0.3s_ease-out]"
                      style={{ transform: 'translate(-50%, -50%) translate(10px, -6px)' }}
                    />
                    <div 
                      className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/40 rounded-full animate-[fade-in_0.4s_ease-out]"
                      style={{ transform: 'translate(-50%, -50%) translate(8px, 8px)' }}
                    />
                  </div>
                )}
              </button>
            )}

            {/* Other category tags */}
            {categoryTags.filter(cat => cat !== "Todos").map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-display uppercase tracking-wider transition-all duration-300 whitespace-nowrap overflow-hidden",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card active:scale-95"
                  )}
                >
                  {isActive && (
                    <div key={splashKey} className="absolute inset-0 pointer-events-none overflow-visible">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-[scale-in_0.3s_ease-out]" />
                      <div 
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-[fade-in_0.2s_ease-out]"
                        style={{ transform: 'translate(-50%, -50%) translate(-12px, -8px)' }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary/50 rounded-full animate-[fade-in_0.3s_ease-out]"
                        style={{ transform: 'translate(-50%, -50%) translate(10px, -6px)' }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/40 rounded-full animate-[fade-in_0.4s_ease-out]"
                        style={{ transform: 'translate(-50%, -50%) translate(8px, 8px)' }}
                      />
                    </div>
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ver todos link - positioned above cards on the right */}
        <div className="flex justify-end mb-4">
          <a 
            href="#" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 text-base sm:text-lg font-impact uppercase tracking-wide transition-all duration-300 group py-2 px-3 -mr-3 active:scale-95" // Added active:scale-95
            onMouseDown={handlePress}
            onTouchStart={(e) => { e.preventDefault(); handlePress(); }}
          >
            Ver todos
            <BulletIcon size="md" className={triggerBulletAnimation ? 'animate-bullet-fire' : ''} /> {/* Conditional animation */}
          </a>
        </div>

        {/* Manga Grid with stagger animation - responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredMangas.map((manga, index) => (
            <ScrollRevealCard key={manga.id} delay={index * 50}>
              <MangaCard
                title={manga.title}
                chapter={manga.chapter}
                imageUrl={manga.imageUrl}
                isNew={manga.isNew}
                isPremium={manga.isPremium}
                type={manga.type}
                status={manga.status}
                lastUpdated={manga.lastUpdated}
                synopsis={manga.synopsis}
                simplified
              />
            </ScrollRevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentSection;