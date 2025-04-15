import { useState } from "react";
import { Plus, Edit, Trash2, Check, X, BookOpen } from "lucide-react";
import { TrainingSectionProps } from "../Interfaces/CatalogList";
import CatalogListRepository from "../Repository/CatalogList";
import { CategorySelectionModal } from "./CategorySelectionModal";
const catalogListRepository = new CatalogListRepository();
export function CapacitationList({
  trainings,
  onAdd,
  onUpdate,
  onDelete,
  categories,
}: TrainingSectionProps) {
  const [newTraining, setNewTraining] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [Categories, setCategories] = useState(categories);
  const [OpenModal, setOpenModal] = useState(false);
  const { startEditing, cancelEditing, saveEditing, handleSubmit } =
    catalogListRepository;
  const [IndividualCategory, setIndividualCategory] = useState<string>("");

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-green-50 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Capacitaciones
          </h2>
        </div>
        <CategorySelectionModal
          isOpen={OpenModal}
          onClose={() => setOpenModal(false)}
          categories={Categories}
          selectedCategoryId={IndividualCategory || null}
          onSelectCategory={setIndividualCategory}
          onConfirm={() => {
            handleSubmit(
              setOpenModal,
              setIndividualCategory,
              onAdd,
              setNewTraining,
              newTraining,
              IndividualCategory
            );
          }}
          trainingName={newTraining}
        />
        {/* Add Training Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenModal(true);
          }}
          className="p-4 border-b"
        >
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <BookOpen size={18} />
              </div>
              <input
                type="text"
                placeholder="Nueva capacitación..."
                value={newTraining}
                onChange={(e) => setNewTraining(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            >
              <Plus size={18} />
              <span>Crear</span>
            </button>
          </div>
        </form>

        {/* Trainings List */}
        <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
          {trainings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay capacitaciones registradas
            </div>
          ) : (
            trainings.map((training) => (
              <div
                key={training.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                {editingId === training.id ? (
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
                          onUpdate,
                          editingId,
                          editingName,
                          setEditingId,
                          setEditingName
                        )
                      }
                      className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      aria-label="Guardar"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() =>
                        cancelEditing(setEditingId, setEditingName)
                      }
                      className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      aria-label="Cancelar"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">{training.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            startEditing(training, setEditingId, setEditingName)
                          }
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                          aria-label="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(training.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {training.categoryName && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                        Categoría: {training.categoryName}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
