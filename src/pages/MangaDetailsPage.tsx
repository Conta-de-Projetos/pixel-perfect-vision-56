import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import MangaCard from "@/components/MangaCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Download, Search, MoreHorizontal, ArrowRight, BookOpen, Crown, User, Eye } from "lucide-react";
import { allMangas, getRelativeTime } from "@/data/mangaData";
import { cn } from "@/lib/utils";
import { useDragScroll } from "@/hooks/useDragScroll";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import SkullRadialMenu from "@/components/SkullRadialMenu";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const dummyChapters = [
  { id: 1, title: "Capítulo 271 - O Incidente de Shibuya, Parte Final", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0), lang: "PT-BR" },
  { id: 2, title: "Capítulo 270 - O Confronto Final", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), lang: "PT-BR" },
  { id: 3, title: "Capítulo 269 - O Despertar de Yuji", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), lang: "PT-BR" },
  { id: 4, title: "Capítulo 268 - A Maldição Suprema", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), lang: "PT-BR" },
  { id: 5, title: "Capítulo 267 - O Sacrifício de Gojo", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28), lang: "PT-BR" },
  { id: 6, title: "Capítulo 266 - O Plano de Kenjaku", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35), lang: "PT-BR" },
  { id: 7, title: "Capítulo 265 - A Chegada de Sukuna", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 42), lang: "PT-BR" },
  { id: 8, title: "Capítulo 264 - O Legado de Itadori", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 49), lang: "PT-BR" },
  { id: 9, title: "Capítulo 263 - A Batalha dos Feiticeiros", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 56), lang: "PT-BR" },
  { id: 10, title: "Capítulo 262 - O Fim da Era", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 63), lang: "PT-BR" },
];

const MangaDetailsPage = () => {
  useScrollToTop();

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest'); // Estado para ordenação
  const relatedMangasRef = useDragScroll<HTMLDivElement>();

  const manga = allMangas.find(m => m.slug === slug);

  if (!manga) {
    navigate("/404"); // Redireciona para a página 404 se o mangá não for encontrado
    return null;
  }

  const formatRating = (r: number | undefined) => r ? r.toFixed(1) : "N/A";
  const chapterNumber = manga.chapter ? manga.chapter.split(' ')[1] : dummyChapters.length;

  // Filter related mangas, excluding the current one
  const relatedMangas = allMangas.filter(m => m.id !== manga.id).slice(0, 6);

  const handleChapterClick = (chapterId: number) => {
    // Aqui você pode adicionar a lógica para navegar para a página de leitura do capítulo
    console.log(`Navegando para o capítulo ${chapterId}`);
    toast.info(`Abrindo Capítulo ${chapterId}`);
  };
  
  // Função para extrair apenas o número do capítulo
  const getChapterTitle = (fullTitle: string) => {
    const match = fullTitle.match(/Capítulo \d+/);
    return match ? match[0].toUpperCase() : fullTitle.toUpperCase();
  };

  // Lógica de ordenação
  const sortedChapters = useMemo(() => {
    // Clonar para evitar mutação direta do estado/dados
    const chapters = [...dummyChapters];
    
    chapters.sort((a, b) => {
      // Ordena pela data. Mais novos (maior data) primeiro.
      if (sortOrder === 'newest') {
        return b.date.getTime() - a.date.getTime();
      } else {
        // Mais antigos (menor data) primeiro.
        return a.date.getTime() - b.date.getTime();
      }
    });
    return chapters;
  }, [sortOrder]);

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
    toast.info(`Capítulos ordenados por ${order === 'newest' ? 'Mais Novos' : 'Mais Antigos'}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <SkullRadialMenu />
      <main className="pb-20 md:pb-0 pt-0 lg:pt-24"> {/* pt-0 ensures content starts at the top on mobile */}
        {/* Manga Info Section */}
        <section className="relative py-8 px-4 overflow-hidden"> {/* Adicionando py-8 para afastar do topo no mobile */}
          <div className="max-w-6xl mx-auto relative">
            {/* Background image with subtle overlay - Desktop only */}
            <div className="absolute inset-0 z-0 hidden lg:block">
              <img 
                src={manga.imageUrl} 
                alt="Background" 
                className="w-full h-full object-cover opacity-5 blur-lg scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
              <div className="absolute inset-0 grunge-texture opacity-20" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Cover Image and Action Buttons (Mobile: Centralized Block) */}
              <div className="lg:col-span-1 w-full flex flex-col items-center lg:items-start">
                
                {/* Container para Capa e Botões (Mobile: Limitado e Centralizado) */}
                <div className="w-full max-w-[300px] mx-auto lg:max-w-none">
                  
                  {/* Cover Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-border/50 rounded-lg">
                    <img 
                      src={manga.imageUrl} 
                      alt={manga.title} 
                      className="w-full h-full object-cover"
                    />
                    {manga.isPremium && (
                      <div className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-xl shadow-lg shadow-amber-500/40">
                        <Crown className="w-6 h-6 text-amber-100" />
                      </div>
                    )}
                  </div>

                  {/* Title (Mobile) */}
                  <h1 className="lg:hidden text-2xl font-impact tracking-wider mt-4 mb-2 text-foreground leading-tight text-center">
                    {manga.title.toUpperCase()}
                  </h1>

                  {/* Action Buttons */}
                  <div className="pt-2 lg:p-0 lg:mt-6">
                    <div className="flex flex-col gap-3 w-full">
                      {/* Botão Começar a Ler - Estilo Vermelho Escuro */}
                      <Button 
                        size="lg" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-2xl group font-display uppercase tracking-wider transition-all duration-300"
                      >
                        <BookOpen className="mr-2 w-5 h-5" />
                        Começar a Ler
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      {/* Botão Adicionar aos Favoritos - Estilo Outline Escuro */}
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent hover:text-accent hover:bg-accent/10 px-8 py-6 text-base rounded-2xl group font-display uppercase tracking-wider transition-all duration-300"
                        onClick={() => {
                          setIsFavorite(!isFavorite);
                          toast.success(isFavorite ? "Removido dos favoritos!" : "Adicionado aos favoritos!");
                        }}
                      >
                        <Heart 
                          className={cn(
                            "mr-2 w-5 h-5 transition-all", 
                            isFavorite 
                              ? "fill-primary text-primary" 
                              : "text-muted-foreground group-hover:text-accent group-hover:fill-accent"
                          )} 
                        />
                        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details (Mobile: Full Width below card, Desktop: Right side) */}
              <div className="lg:col-span-2 text-center lg:text-left px-4 lg:px-0 pt-4 lg:pt-0">
                
                {/* Desktop Title (Hidden on Mobile) */}
                <h1 className="hidden lg:block text-4xl md:text-5xl font-impact tracking-wider mb-3 text-foreground leading-tight">
                  {manga.title.toUpperCase()}
                </h1>
                
                {/* Tags - Updated to match category button style */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                  {manga.tags?.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-card/80 text-foreground hover:text-primary transition-colors duration-300 font-display uppercase tracking-wider text-xs px-4 py-2 rounded-full border border-border/50 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Rating & Chapters & Views */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4 text-muted-foreground text-sm">
                  <p className="flex items-center gap-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{manga.author || "Desconhecido"}</span>
                  </p>
                  {manga.rating && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-semibold text-sm">{formatRating(manga.rating)}</span>
                    </div>
                  )}
                  <p className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{chapterNumber} capítulos</span>
                  </p>
                  {manga.views && (
                    <p className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">{manga.views} visualizações</span>
                    </p>
                  )}
                </div>

                {/* Synopsis */}
                <h2 className="text-2xl font-bold font-display tracking-wider mb-4 text-foreground text-center lg:text-left">
                  Sinopse
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                  {manga.synopsis}
                </p>

                {/* Information Grid */}
                <div className="mt-6 pt-0">
                  <h2 className="text-2xl font-bold font-display tracking-wider mb-4 text-foreground text-center lg:text-left">
                    Informações
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm text-muted-foreground text-center lg:text-left">
                    <div>
                      <span className="font-bold text-foreground">Status:</span> {manga.status === 'ongoing' ? 'Em andamento' : manga.status === 'completed' ? 'Concluído' : 'Hiato'}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Ano:</span> {manga.year || 'N/A'}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Idioma Original:</span> {manga.originalLanguage || 'N/A'}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Faixa Etária:</span> {manga.ageRating || 'Livre'}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Tipo:</span> {manga.type || 'N/A'}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Demografia:</span> {manga.demography || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section className="py-12 px-4 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-impact tracking-wider text-foreground">Capítulos</h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-card/50 border-border/50 text-muted-foreground hover:bg-card hover:text-foreground font-display uppercase tracking-wide">
                      {sortOrder === 'newest' ? 'Mais Novos' : 'Mais Antigos'} <MoreHorizontal className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                    <DropdownMenuItem 
                      className={cn(
                        "cursor-pointer text-muted-foreground hover:bg-secondary hover:text-foreground font-display uppercase tracking-wide",
                        sortOrder === 'newest' && 'bg-secondary text-foreground'
                      )}
                      onClick={() => handleSortChange('newest')}
                    >
                      Ordenar por mais novos
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={cn(
                        "cursor-pointer text-muted-foreground hover:bg-secondary hover:text-foreground font-display uppercase tracking-wide",
                        sortOrder === 'oldest' && 'bg-secondary text-foreground'
                      )}
                      onClick={() => handleSortChange('oldest')}
                    >
                      Ordenar por mais antigos
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto scrollbar-hide border border-border/50 rounded-lg shadow-inner bg-background/20 brutal-card">
              {sortedChapters.map((chapter) => (
                <div 
                  key={chapter.id} 
                  className="flex items-center justify-between p-4 border-b border-border/30 last:border-b-0 hover:bg-primary/10 transition-colors cursor-pointer group"
                  onClick={() => handleChapterClick(chapter.id)}
                >
                  <div>
                    <p className="font-medium text-base group-hover:text-primary transition-colors font-display uppercase tracking-wide text-foreground">
                      {getChapterTitle(chapter.title)}
                    </p>
                    <span className="text-muted-foreground text-sm">
                      {getRelativeTime(chapter.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30 font-display uppercase tracking-wide">
                      {chapter.lang}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Mangas Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-impact tracking-wider mb-6 text-foreground">Mangás Relacionados</h2>
            <div 
              ref={relatedMangasRef} 
              className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 cursor-grab active:cursor-grabbing pt-4"
            >
              <div className="flex gap-4 pr-4">
                {relatedMangas.map((relatedManga) => (
                  <div key={relatedManga.id} className="flex-shrink-0 w-[160px] sm:w-[180px]">
                    <MangaCard
                      title={relatedManga.title}
                      chapter={relatedManga.chapter}
                      imageUrl={relatedManga.imageUrl}
                      rating={relatedManga.rating}
                      isNew={relatedManga.isNew}
                      isPremium={relatedManga.isPremium}
                      type={relatedManga.type}
                      author={relatedManga.author}
                      status={relatedManga.status}
                      lastUpdated={relatedManga.lastUpdated}
                      synopsis={relatedManga.synopsis}
                      simplified
                      slug={relatedManga.slug}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default MangaDetailsPage;