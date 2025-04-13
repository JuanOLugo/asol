import { Search } from "lucide-react";
import { TrainerCard } from "./CapacitationCard";
import { TrainersListProps } from "../Interface/Trainer";

export function TrainersList({
  trainers,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete,
}: TrainersListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Lista de Capacitadores
        </h2>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Trainers List */}
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {trainers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm
              ? "No se encontraron capacitadores"
              : "No hay capacitadores registrados"}
          </div>
        ) : (
          trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
