export interface MindMapItem {
  id: string;
  date: string; // Format: YYYY-MM-DD
  title: string;
  category: string;
  image: string;
  url: string;
  summary?: string;
  tags?: string[];
}

// Function to format today's date as YYYY-MM-DD
const getTodayDate = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TODAY_DATE = getTodayDate();

export const MIND_MAPS_DATA: MindMapItem[] = [
  {
    id: 'mm-1',
    date: TODAY_DATE,
    title: 'Indian Constitution: Fundamental Rights & Duties Deep Dive',
    category: 'INDIAN POLITY',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    url: '#',
    summary: 'Comprehensive breakdown of Articles 12-35, landmark Supreme Court precedents, and legal enforcement mechanisms for Civil Services Aspirants.',
    tags: ['Polity', 'UPSC', 'MPSC', 'Constitution']
  },
  {
    id: 'mm-2',
    date: '2026-08-10',
    title: 'Inflation, Monetary Policy & RBI Repo Rate Framework',
    category: 'INDIAN ECONOMY',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
    url: '#',
    summary: 'Visual synthesis of Repo Rate impacts, Consumer Price Index (CPI), and Monetary Policy Committee (MPC) decision vectors.',
    tags: ['Economy', 'RBI', 'Banking', 'UPSC']
  },
  {
    id: 'mm-3',
    date: '2026-08-09',
    title: 'Climate Action & Biodiversity COP Negotiations Overview',
    category: 'ENVIRONMENT & ECOLOGY',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    url: '#',
    summary: 'Key targets from international climate summits, Paris Agreement NDC targets, and India\'s Net-Zero 2070 Roadmap.',
    tags: ['Environment', 'COP', 'Climate', 'UPSC']
  },
  {
    id: 'mm-4',
    date: '2026-08-08',
    title: 'Freedom Struggle: Non-Cooperation to Civil Disobedience Movement',
    category: 'MODERN HISTORY',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1400&q=80',
    url: '#',
    summary: 'Timeline, key leaders, regional movements, and socio-economic consequences of major Indian national movements.',
    tags: ['History', 'Modern India', 'UPSC', 'MPSC']
  },
  {
    id: 'mm-5',
    date: '2026-08-05',
    title: 'ISRO Space Missions: Gaganyaan, Chandrayaan & Aditya-L1',
    category: 'SCIENCE & TECHNOLOGY',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    url: '#',
    summary: 'High-yield breakdown of satellite launch vehicles (PSLV, LVM3), orbital mechanics, and deep space exploration goals.',
    tags: ['Science', 'ISRO', 'Space', 'UPSC']
  }
];
