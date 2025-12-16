// Dados diversificados de mangá para evitar repetição

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

// URLs de imagens de placeholder para demonstração
const coverImages = {
  bluelock: blueLockCover,
  justiceiro: justiceiroCover,
  nanatsu: nanatsuCover,
  jujutsu: jujutsuCover,
  deadpool: deadpoolCover,
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
    synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito. 300 jogadores são confinados no Blue Lock para uma competição brutal onde apenas os mais egoístas sobrevivem.',
    slug: 'blue-lock',
    tags: ['Esporte', 'Ação', 'Shounen'],
    year: 2018,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '14+',
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
    status: 'ongoing', // Alterado para ongoing
    author: 'Gege Akutami',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    synopsis: 'Yuji Itadori, um estudante com força física anormal, entra no mundo das Maldições após engolir um dedo do Rei das Maldições, Ryomen Sukuna. Agora ele deve coletar todos os dedos para destruí-lo. Ele se junta à Escola Técnica Superior de Jujutsu de Tóquio, onde aprende a controlar sua energia amaldiçoada e a lutar contra as ameaças sobrenaturais que assolam o mundo.',
    slug: 'jujutsu-kaisen',
    tags: ['Ação', 'Sobrenatural', 'Fantasia', 'Shounen', 'Drama'],
    year: 2018,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '16+',
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
  },
];

export const recentMangas: MangaData[] = [
  { id: 1, title: "Jujutsu Kaisen", chapter: "Cap. 271", imageUrl: coverImages.jujutsu, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 15), synopsis: 'Yuji Itadori entra no mundo das Maldições após engolir um dedo do Rei Sukuna.', slug: 'jujutsu-kaisen' },
  { id: 2, title: "Deadpool", chapter: "Cap. 89", imageUrl: coverImages.deadpool, isNew: true, isPremium: true, category: "HQs", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 45), synopsis: 'O Mercenário Tagarela em mais uma aventura sangrenta e hilária.', slug: 'deadpool' },
  { id: 3, title: "Blue Lock", chapter: "Cap. 276", imageUrl: coverImages.bluelock, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 3), synopsis: 'Após a derrota na Copa do Mundo, o Japão cria um programa radical para formar o atacante perfeito.', slug: 'blue-lock' },
  { id: 4, title: "Nanatsu no Taizai", chapter: "Cap. 346", imageUrl: coverImages.nanatsu, isNew: true, isPremium: false, category: "Mangá", type: 'manga', status: 'completed', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 8), synopsis: 'Os Sete Pecados Capitais eram os cavaleiros mais poderosos do Reino de Liones.', slug: 'nanatsu-no-taizai' },
  { id: 5, title: "O Justiceiro", chapter: "Cap. 45", imageUrl: coverImages.justiceiro, isNew: true, isPremium: true, category: "HQs", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), synopsis: 'Frank Castle trava uma guerra implacável contra o crime organizado.', slug: 'o-justiceiro' },
  { id: 6, title: "Jujutsu Kaisen", chapter: "Cap. 270", imageUrl: coverImages.jujutsu, isNew: false, isPremium: false, category: "Mangá", type: 'manga', status: 'ongoing', lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), synopsis: 'A batalha final contra Sukuna atinge seu clímax.', slug: 'jujutsu-kaisen-old-chapter' },
];

export const allMangas: MangaData[] = [
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
  },
  // Removido Demon Slayer
  {
    id: 10,
    title: "Naruto",
    chapter: "Cap. 700",
    imageUrl: coverImages.naruto,
    rating: 9.5,
    isNew: false,
    isPremium: false,
    type: 'manga',
    status: 'completed',
    author: 'Masashi Kishimoto',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    synopsis: 'Naruto Uzumaki, um jovem ninja órfão e rejeitado, sonha em se tornar Hokage, o líder de sua vila, e ganhar o respeito de todos.',
    slug: 'naruto',
    tags: ['Ação', 'Aventura', 'Fantasia', 'Shounen'],
    year: 1999,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '12+',
  },
  {
    id: 11,
    title: "Attack on Titan",
    chapter: "Cap. 139",
    imageUrl: coverImages.aot,
    rating: 9.8,
    isNew: false,
    isPremium: false,
    type: 'manga',
    status: 'completed',
    author: 'Hajime Isayama',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    synopsis: 'A humanidade vive em cidades cercadas por muralhas gigantes para se proteger de Titãs devoradores de homens. Eren Yeager jura exterminá-los após sua cidade ser destruída.',
    slug: 'attack-on-titan',
    tags: ['Ação', 'Fantasia Sombria', 'Drama', 'Seinen'],
    year: 2009,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '18+',
  },
  {
    id: 12,
    title: "My Hero Academia",
    chapter: "Cap. 430",
    imageUrl: coverImages.mha,
    rating: 9.2,
    isNew: true,
    isPremium: false,
    type: 'manga',
    status: 'ongoing',
    author: 'Kohei Horikoshi',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    synopsis: 'Em um mundo onde quase todos nascem com superpoderes, Izuku Midoriya, sem poderes, sonha em se tornar um herói e é escolhido para herdar o poder do maior herói do mundo.',
    slug: 'my-hero-academia',
    tags: ['Ação', 'Superpoderes', 'Shounen', 'Comédia'],
    year: 2014,
    originalLanguage: 'Japonês',
    demography: 'Shounen',
    ageRating: '12+',
  },
];

export const categories = ["Todos", "Mangá", "Manhwa", "Novel", "HQs", "Shoujo", "Seinen"];