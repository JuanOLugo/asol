"use client"

import { Tag, Check, X } from "lucide-react"
import { Category } from "../Interfaces/Category"


interface CategorySelectionModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
  onConfirm: () => void
  trainingName: string
}

export function CategorySelectionModal({
  isOpen,
  onClose,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onConfirm,
  trainingName,
}: CategorySelectionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-green-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Categoría</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Selecciona una categoría para la capacitación: <span className="font-medium">{trainingName}</span>
          </p>

          {categories.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay categorías disponibles</div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-200">
              {categories.map((category) => {
                const isSelected = selectedCategoryId === category.id
                const isDisabled = selectedCategoryId !== null && !isSelected

                return (
                  <div
                    key={category.id}
                    className={`p-3 ${
                      isSelected
                        ? "bg-green-50"
                        : isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag size={18} className="text-green-600" />
                        <span className="text-gray-800">{category.name}</span>
                      </div>
                      <button
                        onClick={() => onSelectCategory(category.id)}
                        disabled={isDisabled}
                        className={`px-3 py-1 rounded-md text-sm ${
                          isSelected
                            ? "bg-green-600 text-white"
                            : isDisabled
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1">
                            <Check size={14} />
                            Seleccionado
                          </span>
                        ) : (
                          "Seleccionar"
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
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
            disabled={selectedCategoryId === null}
            className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              selectedCategoryId === null ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
