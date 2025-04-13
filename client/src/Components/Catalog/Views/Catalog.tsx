"use client"

import { useState } from "react"
import { CatalogHeader } from "../Components/CatalogHeader"
import { CategorySection } from "../Components/CategorySection"
import { CatalogList } from "../Components/CatalogList"
import { PositionSection } from "../Components/PositionSection"

// Mock data
const mockCategories = [
  { id: 1, name: "Tecnología" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Administración" },
  { id: 4, name: "Recursos Humanos" },
  { id: 5, name: "Diseño" },
  { id: 6, name: "Ventas" },
]

const mockTrainings = [
  { id: 1, name: "Programación" },
  { id: 2, name: "Redes Sociales" },
  { id: 3, name: "Gestión de Proyectos" },
  { id: 4, name: "Liderazgo" },
  { id: 5, name: "UX/UI" },
  { id: 6, name: "Estrategia de Ventas" },
]

const mockPositions = [
  { id: 1, name: "Instructor" },
  { id: 2, name: "Coordinador" },
  { id: 3, name: "Supervisor" },
  { id: 4, name: "Director" },
]

// Define item type
interface CatalogItem {
  id: number
  name: string
}

export default function CatalogPage() {
  const [categories, setCategories] = useState<CatalogItem[]>(mockCategories)
  const [trainings, setTrainings] = useState<CatalogItem[]>(mockTrainings)
  const [positions, setPositions] = useState<CatalogItem[]>(mockPositions)

  // Category handlers
  const handleAddCategory = (name: string) => {
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name,
    }
    setCategories([...categories, newCategory])
  }

  const handleUpdateCategory = (id: number, name: string) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, name } : category)))
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  // Training handlers
  const handleAddTraining = (name: string) => {
    const newTraining = {
      id: trainings.length > 0 ? Math.max(...trainings.map((t) => t.id)) + 1 : 1,
      name,
    }
    setTrainings([...trainings, newTraining])
  }

  const handleUpdateTraining = (id: number, name: string) => {
    setTrainings(trainings.map((training) => (training.id === id ? { ...training, name } : training)))
  }

  const handleDeleteTraining = (id: number) => {
    setTrainings(trainings.filter((training) => training.id !== id))
  }

  // Position handlers
  const handleAddPosition = (name: string) => {
    const newPosition = {
      id: positions.length > 0 ? Math.max(...positions.map((p) => p.id)) + 1 : 1,
      name,
    }
    setPositions([...positions, newPosition])
  }

  const handleUpdatePosition = (id: number, name: string) => {
    setPositions(positions.map((position) => (position.id === id ? { ...position, name } : position)))
  }

  const handleDeletePosition = (id: number) => {
    setPositions(positions.filter((position) => position.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CatalogHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category Section */}
          <CategorySection
            categories={categories}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />

          {/* Training Section */}
          <CatalogList
            trainings={trainings}
            onAdd={handleAddTraining}
            onUpdate={handleUpdateTraining}
            onDelete={handleDeleteTraining}
          />

          {/* Position Section */}
          <PositionSection
            positions={positions}
            onAdd={handleAddPosition}
            onUpdate={handleUpdatePosition}
            onDelete={handleDeletePosition}
          />
        </div>
      </div>
    </div>
  )
}
