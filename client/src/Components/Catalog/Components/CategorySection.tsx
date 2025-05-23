import { useState } from "react";
import { Plus, Edit, Trash2, Check, X, Tag } from "lucide-react";
import { CategorySectionProps } from "../Interfaces/Category";
import CategoryRepository from "../Repository/Category";
const categoryRepository = new CategoryRepository();

export function CategorySection({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: CategorySectionProps) {
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const { handleSubmit, startEditing, cancelEditing, saveEditing } =
    categoryRepository;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Categorías</h2>
      </div>

      {/* Add Category Form */}
      <form
        onSubmit={(e) => handleSubmit(e, newCategory, onAdd, setNewCategory)}
        className="p-4 border-b"
      >
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Tag size={18} />
            </div>
            <input
              type="text"
              placeholder="Nueva categoría..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            <Plus size={18} />
            <span>Crear</span>
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {categories.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay categorías registradas
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              {editingId === category._id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() =>
                      saveEditing(
                        setEditingId,
                        setEditingName,
                        onUpdate,
                        editingId,
                        editingName
                      )
                    }
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
                    <span className="text-gray-800">{category.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                      Admin:{" "}
                      {category.Admin.name
                        ? category.Admin.name + " " + category.Admin.lastName
                        : "Sin asignar"}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        startEditing(category, setEditingId, setEditingName)
                      }
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      aria-label="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(category._id)}
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
  );
}
