export interface Comic {
  id: string;
  title: string;
  series: string;
  issue: number;
  coverUrl: string;
  pages: string[];
  description: string;
  author: string;
  artist: string;
  releaseDate: string;
  progress: number; // 0-100
  currentPage: number;
  totalPages: number;
}

// Sample comic data with placeholder images
export const comics: Comic[] = [
  {
    id: "1",
    title: "The Dark Knight Returns",
    series: "Batman",
    issue: 1,
    coverUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1608889175638-9322300c46e8?w=800&h=1200&fit=crop",
    ],
    description: "An epic tale of the Dark Knight's return to Gotham City after years of retirement.",
    author: "Frank Miller",
    artist: "Frank Miller",
    releaseDate: "1986",
    progress: 40,
    currentPage: 2,
    totalPages: 5,
  },
  {
    id: "2",
    title: "Web of Shadows",
    series: "Spider-Man",
    issue: 42,
    coverUrl: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1521714161819-15534968fc5f?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&h=1200&fit=crop",
    ],
    description: "Spider-Man faces his greatest challenge yet as the symbiote threatens to consume him.",
    author: "Dan Slott",
    artist: "Humberto Ramos",
    releaseDate: "2008",
    progress: 75,
    currentPage: 3,
    totalPages: 4,
  },
  {
    id: "3",
    title: "Age of Ultron",
    series: "Avengers",
    issue: 1,
    coverUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=800&h=1200&fit=crop",
    ],
    description: "Earth's mightiest heroes must unite against Ultron's devastating assault on humanity.",
    author: "Brian Michael Bendis",
    artist: "Bryan Hitch",
    releaseDate: "2013",
    progress: 0,
    currentPage: 0,
    totalPages: 6,
  },
  {
    id: "4",
    title: "Watchmen",
    series: "Watchmen",
    issue: 1,
    coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1494346480775-936a9f0d0877?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1533929736562-6f7ec96e2cc1?w=800&h=1200&fit=crop",
    ],
    description: "Who watches the Watchmen? A groundbreaking deconstruction of superhero mythology.",
    author: "Alan Moore",
    artist: "Dave Gibbons",
    releaseDate: "1986",
    progress: 0,
    currentPage: 0,
    totalPages: 5,
  },
  {
    id: "5",
    title: "The Killing Joke",
    series: "Batman",
    issue: 1,
    coverUrl: "https://images.unsplash.com/photo-1559535332-db9971090158?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1559535332-db9971090158?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&h=1200&fit=crop",
    ],
    description: "The definitive Joker origin story that changed Batman comics forever.",
    author: "Alan Moore",
    artist: "Brian Bolland",
    releaseDate: "1988",
    progress: 25,
    currentPage: 1,
    totalPages: 4,
  },
  {
    id: "6",
    title: "Civil War",
    series: "Marvel",
    issue: 1,
    coverUrl: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?w=400&h=600&fit=crop",
    pages: [
      "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=800&h=1200&fit=crop",
    ],
    description: "Hero vs. Hero. The superhero registration act tears the Marvel universe apart.",
    author: "Mark Millar",
    artist: "Steve McNiven",
    releaseDate: "2006",
    progress: 0,
    currentPage: 0,
    totalPages: 5,
  },
];

export function getComicById(id: string): Comic | undefined {
  return comics.find((comic) => comic.id === id);
}

export function getReadingComics(): Comic[] {
  return comics.filter((comic) => comic.progress > 0 && comic.progress < 100);
}

export function getUnreadComics(): Comic[] {
  return comics.filter((comic) => comic.progress === 0);
}
