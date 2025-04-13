import { StatCardProps } from "../Interfaces/StatsCards";

  
export  function StatCard({ title, value, icon, bgColor }: StatCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
          </div>
        </div>
      </div>
    );
  }
  