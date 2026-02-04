export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  tags: string[];
  isTrending?: boolean;
}

export const EVENTS: Event[] = [
  {
    id: 'cjota-na-cupula',
    title: 'Cjota na Cupula',
    date: '7 de fevereiro de 2026 - 19:00',
    location: 'Cupula Pub',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
    tags: ['Trap', 'Funk', 'Em alta'],
    isTrending: true
  },
  {
    id: 'calourada-ti5',
    title: 'Calourada TI5',
    date: '07 de fevereiro',
    location: 'La Calle Brusque (Salão Rio Grande)',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1000&auto=format&fit=crop',
    tags: ['Universitário', 'Open Bar'],
    isTrending: true
  },
  {
    id: 'cervejada-bulls',
    title: 'Cervejada Bulls',
    date: '06 de março',
    location: 'Island Club',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    tags: ['Sertanejo', 'Funk'],
    isTrending: false
  },
  {
    id: 'sunset-lxiii',
    title: 'Sunset LXIII',
    date: '07 de março',
    location: 'Rivage',
    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop',
    tags: ['Eletrônica', 'Sunset'],
    isTrending: false
  },
  {
    id: 'integra-t42',
    title: 'Integra T42',
    date: '06 de fevereiro',
    location: 'Haras Village',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop',
    tags: ['Universitário', 'Integração'],
    isTrending: false
  }
];
