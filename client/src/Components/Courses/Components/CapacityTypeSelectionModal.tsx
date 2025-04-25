"use client";

import { BookOpen, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Training } from "../../Catalog/Interfaces/CatalogList";

interface CapacityTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  capacityTypes: Training[];
  selectedTypes: string[];
  onToggleType: (id: string) => void;
  onConfirm: () => void;
}

export function CapacityTypeSelectionModal({
  isOpen,
  onClose,
  capacityTypes,
  selectedTypes,
  onToggleType,
  onConfirm,
}: CapacityTypeSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [CapacityT, setCapacityT] = useState<Training[]>([]);
  
  
  useEffect(() => {
    setCapacityT(capacityTypes);
  }, [capacityTypes]);

  if (!isOpen) return null;

  // Filter capacity types based on search term
  const filteredTypes = searchTerm.trim()
    ? CapacityT.filter((type) =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : CapacityT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-blue-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Seleccionar Tipos de Capacitación
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar tipos de capacitación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Selecciona los tipos de capacitación para este curso. Puedes
            seleccionar múltiples opciones.
          </p>

          {filteredTypes.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay tipos de capacitación disponibles
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredTypes.map((type) => {
                const isSelected = selectedTypes.includes(type._id);

                return (
                  <div
                    key={type._id}
                    className={`p-3 border rounded-md ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleType(type._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex items-center">
                        <BookOpen size={16} className="text-blue-600 mr-2" />
                        <span className="text-gray-800">{type.name}</span>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected count */}
          <div className="mt-4 text-sm text-gray-600">
            {selectedTypes.length} tipos seleccionados
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
