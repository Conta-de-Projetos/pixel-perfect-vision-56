import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import MangaCard from "@/components/MangaCard";
import ScrollRevealCard from "@/components/ScrollRevealCard";
import PaginationControls from "@/components/PaginationControls";
import SortFilterControls from "@/components/SortFilterControls"; // Importar componente renomeado
import ViewModeToggle from "@/components/ViewModeToggle"; // Importar novo componente
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArrowLeft } from "lucide-react";
import { popularMangas } from "@/data/mangaData";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12; // Definindo quantos itens por página

type SortOption = 'a-z' | 'rating' | 'recent' | 'views';
type ViewMode = 'grid' | 'list';

const CatalogPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<SortOption>('recent');
  const [currentView, setCurrentView] = useState<ViewMode>('grid');

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

  // Lógica de ordenação (simulada)
  const sortedMangas = useMemo(() => {
    const list = [...extendedMangas];
    switch (currentSort) {
      case 'a-z':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
        list.sort((a, b) => (b.lastUpdated?.getTime() || 0) - (a.lastUpdated?.getTime() || 0));
        break;
      case 'views':
        // Simulação de ordenação por views (usando ID como proxy)
        list.sort((a, b) => b.id - a.id);
        break;
    }
    return list;
  }, [extendedMangas, currentSort]);


  const paginatedMangas = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedMangas.slice(startIndex, endIndex);
  }, [currentPage, sortedMangas]);

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
        
        {/* Header - CATÁLOGO */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-impact tracking-wider text-foreground leading-none">
              CATÁLOGO
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-display uppercase tracking-wide">
              {totalItems} títulos encontrados
            </p>
          </div>
        </div>

        {/* Controls: Sort/Filter (Left) and View Mode (Right) */}
        <div className="flex justify-between items-center mb-8">
          <SortFilterControls 
            currentSort={currentSort}
            onSortChange={setCurrentSort}
          />
          <ViewModeToggle
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>

        {/* Manga Grid / List */}
        {currentView === 'grid' ? (
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
        ) : (
          // Placeholder for List View
          <div className="text-center py-16 text-muted-foreground">
            Visualização em Lista em breve...
          </div>
        )}

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

export default CatalogPage;