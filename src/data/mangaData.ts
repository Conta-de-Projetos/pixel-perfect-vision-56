// Dados diversificados de mangá para evitar repetição

export interface Chapter {
  id: number;
  title: string;
  releaseDate: Date;
  language: string;
  isPremium?: boolean;
}

export interface MangaData {
  id: number;
  title: string;
  chapter: string;
  imageUrl: string;
  rating?: number; // Escala 0-10
  isNew?: boolean;
  isPremium?: boolean;
  category?: string;
  views?: string;
  type?: 'manga' | 'manhwa' | 'novel' | 'hq';
  status?: 'ongoing' | 'completed' | 'hiatus';
  author?: string;
  lastUpdated?: Date; // Data da última atualização
  synopsis?: string;
  genres?: string[]; // Novo campo para gêneros
  year?: number; // Novo campo para ano de lançamento
  originalLanguage?: string; // Novo campo para idioma original
  ageRating?: string; // Novo campo para faixa etária
  demographic?: string; // Novo campo para demografia
  chapters?: Chapter[]; // Novo campo para lista de capítulos
}

// Função para calcular tempo relativo
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s atrás`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d atrás`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}sem atrás`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mês${diffInMonths > 1 ? 'es' : ''} atrás`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}ano${diffInYears > 1 ? 's' : ''} atrás`;
};

// Importação das capas
import blueLockCover from "@/assets/blue-lock-cover.webp";
import justiceiroCover from "@/assets/justiceiro-cover.jpg";
import nanatsuCover from "@/assets/nanatsu-cover.jpg";
import jujutsuCover from "@/assets/jujutsu-cover.jpg";
import deadpoolCover from "@/assets/deadpool-cover.jpg";
import jojolandsCover from "@/assets/jojolands-cover.jpg"; // Nova capa
import chainsawManCover from "@/assets/chainsaw-man-cover.jpg"; // Nova capa
import bleachCover from "@/assets/bleach-cover.jpg"; // Nova capa
import sakamotoDaysCover from "@/assets/sakamoto-days-cover.jpg"; // Nova capa
import dragonBallCover from "@/assets/dragon-ball-cover.jpg"; // Nova capa


// URLs de imagens de placeholder para demonstração
const coverImages = {
  bluelock: blueLockCover,
  justiceiro: justiceiroCover,
  nanatsu: nanatsuCover,
  jujutsu: jujutsuCover,
  deadpool: deadpoolCover,
  jojolands: jojolandsCover,
  chainsawMan: chainsawManCover,
  bleach: bleachCover,
  sakamotoDays: sakamotoDaysCover,
  dragonBall: dragonBallCover,
  soloLeveling: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
  onePiece: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
  demonSlayer: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&h=600&fit=crop",
  naruto: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
  aot: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&h=600&fit=crop",
  mha: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=600&fit=crop",
};

export const popularMangas: MangaData[] = [
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
    synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito. 300 jogadores são confinados no Blue Lock para uma competição brutal onde apenas os mais egoístas sobrevivem.'
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
    status: 'completed',
    author: 'Gege Akutami',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    synopsis: 'Yuji Itadori, um estudante com força física anormal, entra no mundo das Maldições após engolir um dedo do Rei das Maldições, Ryomen Sukuna. Agora ele deve coletar todos os dedos para destruí-lo.'
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
    type: 'hq',
    status: 'ongoing',
    author: 'Rob Liefeld',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    synopsis: 'Wade Wilson, o Mercenário Tagarela, é um anti-herói imortal com humor negro e habilidades de regeneração. Entre piadas e violência extrema, ele luta contra vilões enquanto quebra a quarta parede.'
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
    synopsis: 'Os Sete Pecados Capitais eram os cavaleiros mais poderosos do Reino de Liones. Após serem acusados de traição, Elizabeth parte em busca deles para salvar o reino das Santas Cavaleiras.'
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
    type: 'hq',
    status: 'ongoing',
    author: 'Garth Ennis',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 semana atrás
    synopsis: 'Frank Castle perdeu sua família em um tiroteio entre gangues. Agora, como O Justiceiro, ele trava uma guerra implacável contra o crime organizado, usando métodos brutais para eliminar criminosos.'
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
    synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito. 300 jogadores são confinados no Blue Lock para uma competição brutal onde apenas os mais egoístas sobrevivem.'
  },
];

export const recentMangas: MangaData[] = [
  { id: 1, title: "Jujutsu Kaisen", chapter: "Cap. 271", imageUrl: coverImages.jujutsu, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'completed', lastUpdated: new Date(Date.now() - 1000 * 60 * 15), synopsis: 'Yuji Itadori entra no mundo das Maldições após engolir um dedo do Rei Sukuna.' },
  { id: 2, title: "Deadpool", chapter: "Cap. 89", imageUrl: coverImages.deadpool, isNew: true, isPremium: true, category: "HQs", type: 'hq', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 45), synopsis: 'O Mercenário Tagarela em mais uma aventura sangrenta e hilária.' },
  { id: 3, title: "Blue Lock", chapter: "Cap. 276", imageUrl: coverImages.bluelock, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 3), synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito.' },
  { id: 4, title: "Nanatsu no Taizai", chapter: "Cap. 346", imageUrl: coverImages.nanatsu, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'completed', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 8), synopsis: 'Os Sete Pecados Capitais eram os cavaleiros mais poderosos do Reino de Liones.' },
  { id: 5, title: "O Justiceiro", chapter: "Cap. 45", imageUrl: coverImages.justiceiro, isNew: true, isPremium: true, category: "HQs", type: 'hq', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), synopsis: 'Frank Castle trava uma guerra implacável contra o crime organizado.' },
  { id: 6, title: "Jujutsu Kaisen", chapter: "Cap. 270", imageUrl: coverImages.jujutsu, isNew: false, isPremium: false, category: "Mangá", type: 'manga', status: 'completed', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), synopsis: 'A batalha final contra Sukuna atinge seu clímax.' },
];

export const topMangasData = {
  hoje: [
    { id: 1, title: "Jujutsu Kaisen", chapter: "Cap. 271", views: "145.8K", rating: 9.7, imageUrl: coverImages.jujutsu },
    { id: 2, title: "Blue Lock", chapter: "Cap. 276", views: "125.4K", rating: 9.8, imageUrl: coverImages.bluelock },
    { id: 3, title: "Deadpool", chapter: "Cap. 89", views: "98.7K", rating: 9.5, imageUrl: coverImages.deadpool },
    { id: 4, title: "Nanatsu no Taizai", chapter: "Cap. 346", views: "87.2K", rating: 9.3, imageUrl: coverImages.nanatsu },
    { id: 5, title: "O Justiceiro", chapter: "Cap. 45", views: "76.1K", rating: 9.4, imageUrl: coverImages.justiceiro },
  ],
  semana: [
    { id: 1, title: "Blue Lock", chapter: "Cap. 276", views: "892.1K", rating: 9.8, imageUrl: coverImages.bluelock },
    { id: 2, title: "Jujutsu Kaisen", chapter: "Cap. 271", views: "856.4K", rating: 9.7, imageUrl: coverImages.jujutsu },
    { id: 3, title: "Deadpool", chapter: "Cap. 89", views: "734.2K", rating: 9.5, imageUrl: coverImages.deadpool },
    { id: 4, title: "O Justiceiro", chapter: "Cap. 45", views: "621.8K", rating: 9.4, imageUrl: coverImages.justiceiro },
    { id: 5, title: "Nanatsu no Taizai", chapter: "Cap. 346", views: "545.6K", rating: 9.3, imageUrl: coverImages.nanatsu },
  ],
  geral: [
    { id: 1, title: "Blue Lock", chapter: "Cap. 276", views: "14.5M", rating: 9.8, imageUrl: coverImages.bluelock },
    { id: 2, title: "Jujutsu Kaisen", chapter: "Cap. 271", views: "13.2M", rating: 9.7, imageUrl: coverImages.jujutsu },
    { id: 3, title: "Nanatsu no Taizai", chapter: "Cap. 346", views: "12.8M", rating: 9.3, imageUrl: coverImages.nanatsu },
    { id: 4, title: "O Justiceiro", chapter: "Cap. 45", views: "10.6M", rating: 9.4, imageUrl: coverImages.justiceiro },
    { id: 5, title: "Deadpool", chapter: "Cap. 89", views: "9.9M", rating: 9.5, imageUrl: coverImages.deadpool },
  ],
};

export const categories = ["Todos", "Mangá", "Manhwa", "Novel", "HQs", "Shoujo", "Seinen"];

// Dados de exemplo para a página de detalhes do mangá
export const jojoMangaDetails: MangaData = {
  id: 100,
  title: "JoJo's Bizarre Adventure, Part 9: The JOJOLands (Official Colored)",
  chapter: "Cap. 6",
  imageUrl: coverImages.jojolands,
  rating: 9.4,
  isNew: true,
  isPremium: false,
  type: 'manga',
  status: 'ongoing',
  author: 'Hirohiko Araki',
  lastUpdated: new Date('2024-08-29T10:00:00Z'),
  synopsis: "The ninth story arc of JoJo's Bizarre Adventure. O'ahu, early 2020s. Dua Lipa is a trending musician, and COVID is still a major concern. On this island lives a 15-year-old boy named Jodio Joestar. Alongside his sibling, Dragona Joestar, they act as dealers for certain illegal substances. One day, their employer comes and shows them an excellent find: a Japanese person has landed in Hawaii with a diamond worth over six million dollars. Normally it would be impossible to steal, but for two siblings with Stands... This is a story of a young boy and his quest to become rich.",
  genres: ["Ação", "Comédia", "Crime", "Aventura", "Drama"],
  year: 2023,
  originalLanguage: "Japonês",
  ageRating: "Livre",
  demographic: "Seinen",
  chapters: [
    { id: 6, title: "Capítulo 6 - Vulcão do Haulalai - Cat Size, Parte 1", releaseDate: new Date('2024-08-29T10:00:00Z'), language: "PT-BR" },
    { id: 5, title: "Capítulo 5 - Suba Mais Alto", releaseDate: new Date('2024-08-29T10:00:00Z'), language: "PT-BR" },
    { id: 4, title: "Capítulo 4 - A Casa de Campo na Ilha do Hawaii, Parte 2", releaseDate: new Date('2024-08-29T10:00:00Z'), language: "PT-BR" },
    { id: 3, title: "Capítulo 3 - A Casa de Campo na Ilha do Hawaii, Parte 1", releaseDate: new Date('2024-01-08T10:00:00Z'), language: "PT-BR" },
    { id: 2, title: "Capítulo 2 - South King Street (Calle South King)", releaseDate: new Date('2023-12-25T10:00:00Z'), language: "PT-BR" },
    { id: 1, title: "Capítulo 1 - Partida (DEPARTURE)", releaseDate: new Date('2023-12-25T10:00:00Z'), language: "PT-BR" },
  ]
};

export const relatedMangas: MangaData[] = [
  { id: 101, title: "Chainsaw Man (Official Colored)", chapter: "Cap. 168", imageUrl: coverImages.chainsawMan, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), rating: 9.1, type: 'manga' },
  { id: 102, title: "Bleach (Official Colored)", chapter: "Cap. 686", imageUrl: coverImages.bleach, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), rating: 9.0, type: 'manga' },
  { id: 103, title: "JoJo's Bizarre Adventure, Part 8: JoJolion (Official Colored)", chapter: "Cap. 110", imageUrl: coverImages.jojolands, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), rating: 9.2, type: 'manga' },
  { id: 104, title: "Sakamoto Days (Official Colored)", chapter: "Cap. 170", imageUrl: coverImages.sakamotoDays, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 14), rating: 8.9, type: 'manga' },
  { id: 105, title: "Dragon Ball Super (Official Colored)", chapter: "Cap. 108", imageUrl: coverImages.dragonBall, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), rating: 8.8, type: 'manga' },
  { id: 106, title: "JoJo's Bizarre Adventure, Part 7: Steel Ball Run (Official Colored)", chapter: "Cap. 95", imageUrl: coverImages.jojolands, lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), rating: 9.3, type: 'manga' },
];