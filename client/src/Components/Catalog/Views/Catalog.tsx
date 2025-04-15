"use client"

import { useState } from "react"
import { CatalogHeader } from "../Components/CatalogHeader"
import { CategorySection } from "../Components/CategorySection"
import { CapacitationList } from "../Components/CapacitationList"
import { CargoSection} from "../Components/CargoSection"
import { Category } from "../Interfaces/Category"
import { Training } from "../Interfaces/CatalogList"
import { Position } from "../Interfaces/Position"
import CatalogRepository from "../Repository/Catalog"
const catalogRepository = new CatalogRepository();

// Define item types
const Categories = [
  { id: "1", name: "Capacitación" },
  { id: "2", name: "Cargo" },
]

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>(Categories)
  const [trainings, setTrainings] = useState<Training[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const {handleAddCategory, handleUpdateCategory, handleDeleteCategory, handleAddTraining, handleUpdateTraining, handleDeleteTraining, handleAddPosition, handleUpdatePosition, handleDeletePosition} = catalogRepository

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CatalogHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Categoría Section */}
          <CategorySection
            categories={categories}
            onAdd={(name: string) => handleAddCategory(name, setCategories, categories)}
            onUpdate={(id: string, name: string) => handleUpdateCategory(id, name, setCategories, categories, setTrainings, trainings)}
            onDelete={(id: string) => handleDeleteCategory(id, setCategories, categories, setTrainings, trainings)}
          />

          {/* Capacitación Section */}
          <CapacitationList
            trainings={trainings}
            categories={categories}
            onAdd={(name: string, categoryId: string) => handleAddTraining(name, setTrainings, trainings, categories, categoryId) }
            onUpdate={(id: number, name: string) => handleUpdateTraining(id, name, setTrainings, trainings)}
            onDelete={(id: number) => handleDeleteTraining(id, setTrainings, trainings)}
          />

          {/* Cargo Section */}
          <CargoSection
            positions={positions}
            onAdd={(name: string) => handleAddPosition(name, setPositions, positions)}
            onUpdate={(id: number, name: string) => handleUpdatePosition(id, name, setPositions, positions)}
            onDelete={(id: number) => handleDeletePosition(id, setPositions, positions)}
          />
        </div>
      </div>
    </div>
  )
}