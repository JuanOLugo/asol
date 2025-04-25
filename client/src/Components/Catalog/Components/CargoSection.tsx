import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Check, X, Briefcase } from "lucide-react";
import { Position, PositionSectionProps } from "../Interfaces/Position";
import PositionRepository from "../Repository/Position";
import { CargoSelectionModal } from "./CargoSelectionModal";
import { GeneralTitle } from "../Interfaces/GeneralTitle";

export function CargoSection({
  cargosGenerales,
  positions,
  onAdd,
  onUpdate,
  onDelete,
}: PositionSectionProps) {
  const { handleSubmit, startEditing, cancelEditing, saveEditing } =
    new PositionRepository();
  const [newPosition, setNewPosition] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCargoId, setSelectedCargoId] = useState<string | null>(null);
  const [Positions, setPositions] = useState<Position[] | null>(null);
  const [WhatToDo, setWhatToDo] = useState("create");
  const [CargosGenerales, setCargosGenerales] =
    useState<GeneralTitle[] | null>(null);
  useEffect(() => {
    setPositions(positions);

    setCargosGenerales(cargosGenerales);
  }, [positions, cargosGenerales]);

  if (!Positions || !CargosGenerales) return <div>Cargando...</div>

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-purple-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Cargos</h2>
      </div>

      {/* Add Position Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="p-4 border-b"
      >
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Briefcase size={18} />
            </div>
            <input
              type="text"
              placeholder="Nuevo cargo..."
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
          >
            <Plus size={18} />
            <span>Crear</span>
          </button>
        </div>
      </form>

      {/* Positions List */}
      <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {Positions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay cargos registrados
          </div>
        ) : (
          Positions.map((position) => (
            <div
              key={position._id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              {editingId === position._id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setWhatToDo("update")
                      setIsOpen(true)
                    }}
                    className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                    aria-label="Guardar"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => cancelEditing(setEditingId, setEditingName)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Cancelar"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-800">{position.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                      Cargo general:{" "}
                      {position.category
                        ? position.category.name
                        : "Sin asignar"}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        startEditing(position, setEditingId, setEditingName)
                      }
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(position._id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <CargoSelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cargos={CargosGenerales}
        selectedCargoId={selectedCargoId}
        onSelectCargo={setSelectedCargoId}
        onConfirm={() => {
          if (WhatToDo === "create") {
            handleSubmit(
              onAdd,
              newPosition,
              setNewPosition,
              selectedCargoId ?? ""
            );
          } else if (WhatToDo === "update") {

            saveEditing(
              onUpdate,
              editingId ?? "",
              editingName,
              selectedCargoId ?? ""
            )
            handleSubmit(
              onUpdate,
              newPosition,
              setNewPosition,
              selectedCargoId ?? ""
            );
            
          }
          setWhatToDo("create");
          setIsOpen(false);
          setSelectedCargoId("");
          setEditingId("");
          setEditingName("");
        }}
        cargoName={newPosition}
      />
    </div>
  );
}
