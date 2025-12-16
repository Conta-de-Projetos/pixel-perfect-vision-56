import MangaCard from "./MangaCard";
import ScrollRevealCard from "./ScrollRevealCard";
import { Flame, Sparkles } from "lucide-react";
import { popularMangas } from "@/data/mangaData";
import BulletIcon from "./BulletIcon";
import { useState } from "react"; // Importar useState

const PopularSection = () => {
  const [triggerBulletAnimation, setTriggerBulletAnimation] = useState(false);

  const handlePress = () => {
    setTriggerBulletAnimation(true);
    setTimeout(() => setTriggerBulletAnimation(false), 300); // Reset animation state after 300ms
  };

  return (
    <section id="populares" className="relative py-24 px-4 grunge-texture overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      
      {/* Blood line top with glow */}
      <div className="relative max-w-4xl mx-auto mb-16">
        <div className="blood-line" />
        <div className="absolute inset-0 blood-line blur-sm opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header with enhanced styling */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 animate-fade-up">
            <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 group hover:scale-110 transition-transform duration-300 rounded-xl">
              <Flame className="w-7 h-7 text-primary-foreground" />
              <div className="absolute inset-0 bg-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-impact tracking-wider">
                  MAIS POPULARES
                </h2>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground text-sm mt-1 font-display uppercase tracking-wide">
                OS TÍTULOS MAIS LIDOS DA SEMANA
              </p>
            </div>
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
          {popularMangas.map((manga, index) => (
            <ScrollRevealCard key={manga.id} delay={index * 50}>
              <MangaCard
                title={manga.title}
                chapter={manga.chapter}
                imageUrl={manga.imageUrl}
                rating={manga.rating}
                isNew={manga.isNew}
                isPremium={manga.isPremium}
                type={manga.type}
                author={manga.author}
                status={manga.status}
                lastUpdated={manga.lastUpdated}
                synopsis={manga.synopsis}
                simplified
                slug={manga.slug} {/* Passando o slug aqui */}
              />
            </ScrollRevealCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularSection;