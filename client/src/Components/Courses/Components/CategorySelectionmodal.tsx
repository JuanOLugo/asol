"use client"

import { Tag, X, Search } from "lucide-react"
import { useState } from "react"

interface Category {
  _id: string
  name: string
}

interface CategorySelectionModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  onSelectCategory: (id: string, name: string) => void
}

export function CategorySelectionModal({ isOpen, onClose, categories, onSelectCategory }: CategorySelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  if (!isOpen) return null

  // Filter categories based on search term
  const filteredCategories = searchTerm.trim()
    ? categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : categories

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-blue-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Categoría</h3>
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
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">Selecciona una categoría para este curso.</p>

          {filteredCategories.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay categorías disponibles</div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => onSelectCategory(category._id, category.name)}
                  className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <Tag size={16} className="text-blue-600 mr-2" />
                    <span className="text-gray-800">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
