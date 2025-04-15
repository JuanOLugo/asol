"use client"

import { BookOpen, X, Search } from "lucide-react"
import { useState } from "react"

interface Training {
  id: string
  name: string
  categoryId?: string
  categoryName?: string
}

interface TrainingSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  trainings: Training[]
  selectedTrainings: string[]
  onToggleTraining: (id: string) => void
  onConfirm: () => void
}

export function MultipleCapacitationModal({
  isOpen,
  onClose,
  trainings,
  selectedTrainings,
  onToggleTraining,
  onConfirm,
}: TrainingSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  if (!isOpen) return null

  // Filter trainings based on search term
  const filteredTrainings = searchTerm.trim()
    ? trainings.filter((training) => training.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : trainings

  // Group trainings by category
  const trainingsByCategory: Record<string, Training[]> = {}
  filteredTrainings.forEach((training) => {
    const category = training.categoryName || "Sin categoría"
    if (!trainingsByCategory[category]) {
      trainingsByCategory[category] = []
    }
    trainingsByCategory[category].push(training)
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-blue-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Capacitaciones</h3>
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
              placeholder="Buscar capacitaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Selecciona las capacitaciones para este capacitador. Puedes seleccionar múltiples opciones.
          </p>

          {filteredTrainings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay capacitaciones disponibles</div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              {Object.entries(trainingsByCategory).map(([category, categoryTrainings]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">{category}</h4>
                  <div className="space-y-2">
                    {categoryTrainings.map((training) => {
                      const isSelected = selectedTrainings.includes(training.id)

                      return (
                        <div
                          key={training.id}
                          className={`p-3 border rounded-md ${
                            isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => onToggleTraining(training.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div className="ml-3 flex items-center">
                              <BookOpen size={16} className="text-blue-600 mr-2" />
                              <span className="text-gray-800">{training.name}</span>
                            </div>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected count */}
          <div className="mt-4 text-sm text-gray-600">{selectedTrainings.length} capacitaciones seleccionadas</div>
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
  )
}
