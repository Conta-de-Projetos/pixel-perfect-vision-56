import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import MangaCard from "@/components/MangaCard";
import ScrollRevealCard from "@/components/ScrollRevealCard";
import PaginationControls from "@/components/PaginationControls";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Flame, Sparkles } from "lucide-react";
import { popularMangas } from "@/data/mangaData";

const ITEMS_PER_PAGE = 12; // Definindo quantos itens por página

const PopularPage = () => {
  useScrollToTop();
  const [currentPage, setCurrentPage] = useState(1);

  // Simulação de dados paginados
  const totalItems = popularMangas.length * 3; // Multiplicando para simular mais dados
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Criando uma lista estendida para simular várias páginas
  const extendedMangas = useMemo(() => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list = list.concat(popularMangas.map(m => ({
        ...m,
        id: m.id + i * popularMangas.length, // Garante IDs únicos
        title: `${m.title} (P${i + 1})`, // Apenas para visualização
        isNew: i === 0 ? m.isNew : false,
      })));
    }
    return list;
  }, []);

  const paginatedMangas = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return extendedMangas.slice(startIndex, endIndex);
  }, [currentPage, extendedMangas]);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <main className="pt-32 pb-20 md:pb-0 max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-4">
            <Flame className="w-8 h-8 text-primary fill-primary/30" />
            <h1 className="text-4xl md:text-5xl font-impact tracking-wider text-foreground">
              MAIS POPULARES
            </h1>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg mt-2 font-display uppercase tracking-wide">
            OS TÍTULOS MAIS LIDOS DO MÊS
          </p>
        </div>

        {/* Manga Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {paginatedMangas.map((manga, index) => (
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
                slug={manga.slug}
              />
            </ScrollRevealCard>
          ))}
        </div>

        {/* Pagination Controls (Bottom) */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          className="mt-12"
        />

      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default PopularPage;