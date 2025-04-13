import { useState } from "react"
import { Plus, Edit, Trash2, Check, X, Briefcase } from "lucide-react"
import { PositionSectionProps } from "../Interfaces/Position"
import PositionRepository from "../Repository/Position"

export function PositionSection({ positions, onAdd, onUpdate, onDelete }: PositionSectionProps) {
  const { handleSubmit, startEditing, cancelEditing, saveEditing } = new PositionRepository();
  const [newPosition, setNewPosition] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")

 

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-purple-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Cargos</h2>
      </div>

      {/* Add Position Form */}
      <form onSubmit={(e) => handleSubmit(e, onAdd, newPosition, setNewPosition)} className="p-4 border-b">
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
        {positions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No hay cargos registrados</div>
        ) : (
          positions.map((position) => (
            <div key={position.id} className="p-4 hover:bg-gray-50 transition-colors">
              {editingId === position.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEditing(setEditingId, setEditingName, onUpdate, editingId, editingName)}
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
                  <span className="text-gray-800">{position.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(position, setEditingId, setEditingName  )}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(position.id)}
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
    </div>
  )
}
