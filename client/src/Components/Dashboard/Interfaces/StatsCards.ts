export interface StatsCardsProps {
  stats: {
    capacitadores: number;
    cursos: number;
    admins: number;
  };
}


export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}


