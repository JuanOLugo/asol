import { Users, BookOpen, ShieldCheck } from "lucide-react";
import { StatsCardsProps } from "../Interfaces/StatsCards";
import { StatCard } from "./StatCard";

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Capacitadores"
        value={stats.capacitadores}
        icon={<Users className="h-8 w-8 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Cursos"
        value={stats.cursos}
        icon={<BookOpen className="h-8 w-8 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Administradores"
        value={stats.admins}
        icon={<ShieldCheck className="h-8 w-8 text-purple-600" />}
        bgColor="bg-purple-50"
      />
    </div>
  );
}

