// Dados diversificados de mangá para evitar repetição
import { format, formatDistanceToNow, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface MangaData {
  id: number;
  title: string;
  chapter: string;
  imageUrl: string;
  rating?: number; // Escala 0-10
  isNew?: boolean;
  isPremium?: boolean;
  category?: string;
  views?: string; // Novo campo para visualizações
  type?: 'manga' | 'manhwa' | 'novel';
  status?: 'ongoing' | 'completed' | 'hiatus';
  author?: string;
  lastUpdated?: Date; // Data da última atualização
  synopsis?: string;
  slug?: string; // Adicionado para URL amigável
  tags?: string[]; // Novo campo para tags
  year?: number; // Novo campo para ano de lançamento
  originalLanguage?: string; // Novo campo para idioma original
  demography?: string; // Novo campo para demografia
  ageRating?: string; // Novo campo para faixa etária
}

// Função para calcular tempo relativo
export const getRelativeTime = (date: Date): string => {
  const daysDifference = differenceInDays(new Date(), date);

  if (daysDifference >= 30) {
    // Para capítulos com mais de 30 dias, use a data fixa (ex: 12 Out 2024)
    return format(date, 'dd MMM yyyy', { locale: ptBR });
  }

  // Para capítulos recentes, use tempo relativo
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

// Importação das capas
import blueLockCover from "@/assets/blue-lock-cover.webp";
import justiceiroCover from "@/assets/justiceiro-cover.jpg";
import nanatsuCover from "@/assets/nanatsu-cover.jpg";
import jujutsuCover from "@/assets/jujutsu-cover.jpg";
import deadpoolCover from "@/assets/deadpool-cover.jpg";

// URLs de imagens de placeholder para demonstração
const coverImages = {
  bluelock: blueLockCover,
  justiceiro: justiceiroCover,
  nanatsu: nanatsuCover,
  jujutsu: jujutsuCover,
  deadpool: deadpoolCover,
  aot: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&h=600&fit=crop",
  mha: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=600&fit=crop",
};

const baseMangas: MangaData[] = [
  { 
    id: 1, 
    title: "Blue Lock", 
    chapter: "Cap. 276", 
    imageUrl: coverImages.bluelock, 
    rating: 9.8, 
    isNew: true,
    isPremium: false,
    type: 'manga',
    status: 'ongoing',
    author: 'Muneyuki Kaneshiro',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito. 300 jogadores são confinados no Blue Lock para uma competição brutal onde apenas os mais egoístas sobrevivem.',
    slug: 'blue-lock',
    tags: ['Esporte', 'Ação', 'Shounen'],
    year: 2018,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '14+',
    views: '1.2M',
  },
  { 
    id: 2, 
    title: "Jujutsu Kaisen", 
    chapter: "Cap. 271", 
    imageUrl: coverImages.jujutsu, 
    rating: 9.7, 
    isNew: true,
    isPremium: false,
    type: 'manga',
    status: 'ongoing',
    author: 'Gege Akutami',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    synopsis: 'Yuji Itadori, um estudante com força física anormal, entra no mundo das Maldições após engolir um dedo do Rei das Maldições, Ryomen Sukuna. Agora ele deve coletar todos os dedos para destruí-lo. Ele se junta à Escola Técnica Superior de Jujutsu de Tóquio, onde aprende a controlar sua energia amaldiçoada e a lutar contra as ameaças sobrenaturais que assolam o mundo.',
    slug: 'jujutsu-kaisen',
    tags: ['Ação', 'Sobrenatural', 'Fantasia', 'Shounen', 'Drama'],
    year: 2018,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '16+',
    views: '2.5M',
  },
  { 
    id: 3, 
    title: "Deadpool", 
    chapter: "Cap. 89", 
    imageUrl: coverImages.deadpool, 
    rating: 9.5, 
    isNew: true,
    isPremium: true,
    category: 'HQs',
    type: 'manga',
    status: 'ongoing',
    author: 'Rob Liefeld',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    synopsis: 'Wade Wilson, o Mercenário Tagarela, é um anti-herói imortal com humor negro e habilidades de regeneração. Entre piadas e violência extrema, ele luta contra vilões enquanto quebra a quarta parede.',
    slug: 'deadpool',
    tags: ['Ação', 'Comédia', 'Anti-Herói', 'HQs'],
    year: 1991,
    originalLanguage: 'Inglês',
    demography: 'Adulto',
    ageRating: '18+',
    views: '890K',
  },
  { 
    id: 4, 
    title: "Nanatsu no Taizai", 
    chapter: "Cap. 346", 
    imageUrl: coverImages.nanatsu, 
    rating: 9.3, 
    isNew: false,
    isPremium: false,
    type: 'manga',
    status: 'completed',
    author: 'Nakaba Suzuki',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
    synopsis: 'Os Sete Pecados Capitais eram os cavaleiros mais poderosos do Reino de Liones. Após serem acusados de traição, Elizabeth parte em busca deles para salvar o reino das Santas Cavaleiras.',
    slug: 'nanatsu-no-taizai',
    tags: ['Aventura', 'Fantasia', 'Shounen'],
    year: 2012,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '14+',
    views: '1.5M',
  },
  { 
    id: 5, 
    title: "O Justiceiro", 
    chapter: "Cap. 45", 
    imageUrl: coverImages.justiceiro, 
    rating: 9.4, 
    isNew: true,
    isPremium: true,
    category: 'HQs',
    type: 'manga',
    status: 'ongoing',
    author: 'Garth Ennis',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 semana atrás
    synopsis: 'Frank Castle perdeu sua família em um tiroteio entre gangues. Agora, como O Justiceiro, ele trava uma guerra implacável contra o crime organizado, usando métodos brutais para eliminar criminosos.',
    slug: 'o-justiceiro',
    tags: ['Ação', 'Crime', 'Anti-Herói', 'HQs'],
    year: 1974,
    originalLanguage: 'Inglês',
    demography: 'Adulto',
    ageRating: '18+',
    views: '950K',
  },
  {
    id: 6, 
    title: "Blue Lock", 
    chapter: "Cap. 275", 
    imageUrl: coverImages.bluelock, 
    rating: 9.6, 
    isNew: false,
    isPremium: false,
    type: 'manga',
    status: 'ongoing',
    author: 'Muneyuki Kaneshiro',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 semanas atrás
    synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito. 300 jogadores são confinados no Blue Lock para uma competição brutal onde apenas os mais egoístas sobrevivem.',
    slug: 'blue-lock-old-chapter',
    tags: ['Esporte', 'Ação', 'Shounen'],
    year: 2018,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '14+',
    views: '1.1M',
  },
];

export const popularMangas: MangaData[] = baseMangas.filter(manga => 
  manga.title === "Jujutsu Kaisen" || 
  manga.title === "Blue Lock" || 
  manga.title === "Nanatsu no Taizai" || 
  manga.title === "Deadpool" || 
  manga.title === "O Justiceiro"
);

export const recentMangas: MangaData[] = baseMangas.filter(manga => 
  manga.title === "Jujutsu Kaisen" || 
  manga.title === "Blue Lock" || 
  manga.title === "Nanatsu no Taizai" || 
  manga.title === "Deadpool" || 
  manga.title === "O Justiceiro"
);

export const allMangas: MangaData[] = baseMangas.filter(manga => 
  manga.title === "Jujutsu Kaisen" || 
  manga.title === "Blue Lock" || 
  manga.title === "Nanatsu no Taizai" || 
  manga.title === "Deadpool" || 
  manga.title === "O Justiceiro"
);

export const categories = ["Todos", "Mangá", "Manhwa", "Novel", "HQs", "Shoujo", "Seinen"];