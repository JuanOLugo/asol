"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { TrainersHeader } from "../Components/CapacitationHeader"
import { TrainersList } from "../Components/CapacitatorsList"
import { TrainerForm } from "../Components/CapacitationForm"

// Mock trainer data
const mockTrainers = [
  {
    id: 1,
    dni: "12345678",
    name: "Carlos",
    lastName: "Rodríguez",
    email: "carlos@example.com",
    password: "password123",
    cargo: "Instructor",
    categoria: "Tecnología",
    capacitacion: "Programación",
    createAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    dni: "23456789",
    name: "Ana",
    lastName: "Martínez",
    email: "ana@example.com",
    password: "password123",
    cargo: "Coordinador",
    categoria: "Marketing",
    capacitacion: "Redes Sociales",
    createAt: "2023-02-20T14:45:00Z",
  },
  {
    id: 3,
    dni: "34567890",
    name: "Miguel",
    lastName: "López",
    email: "miguel@example.com",
    password: "password123",
    cargo: "Instructor",
    categoria: "Administración",
    capacitacion: "Gestión de Proyectos",
    createAt: "2023-03-10T09:15:00Z",
  },
  {
    id: 4,
    dni: "45678901",
    name: "Laura",
    lastName: "Sánchez",
    email: "laura@example.com",
    password: "password123",
    cargo: "Supervisor",
    categoria: "Recursos Humanos",
    capacitacion: "Liderazgo",
    createAt: "2023-04-05T16:20:00Z",
  },
  {
    id: 5,
    dni: "56789012",
    name: "Javier",
    lastName: "González",
    email: "javier@example.com",
    password: "password123",
    cargo: "Instructor",
    categoria: "Diseño",
    capacitacion: "UX/UI",
    createAt: "2023-05-12T11:10:00Z",
  },
]

// Define trainer type
export interface Trainer {
  id: number
  dni: string
  name: string
  lastName: string
  email: string
  password: string
  cargo: string
  categoria: string
  capacitacion: string
  createAt: string
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers)
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>(mockTrainers)
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Filter trainers when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTrainers(trainers)
    } else {
      const lowercasedSearch = searchTerm.toLowerCase()
      const filtered = trainers.filter(
        (trainer) =>
          trainer.name.toLowerCase().includes(lowercasedSearch) ||
          trainer.lastName.toLowerCase().includes(lowercasedSearch) ||
          trainer.dni.includes(searchTerm),
      )
      setFilteredTrainers(filtered)
    }
  }, [searchTerm, trainers])

  // Handle adding a new trainer
  const handleAddTrainer = (newTrainer: Omit<Trainer, "id" | "createAt">) => {
    const trainerWithId = {
      ...newTrainer,
      id: trainers.length > 0 ? Math.max(...trainers.map((t) => t.id)) + 1 : 1,
      createAt: new Date().toISOString(),
    }
    setTrainers([...trainers, trainerWithId])
    setSelectedTrainer(null)
    setIsEditing(false)
  }

  // Handle updating an existing trainer
  const handleUpdateTrainer = (updatedTrainer: Trainer) => {
    const updatedTrainers = trainers.map((trainer) => (trainer.id === updatedTrainer.id ? updatedTrainer : trainer))
    setTrainers(updatedTrainers)
    setSelectedTrainer(null)
    setIsEditing(false)
  }

  // Handle deleting a trainer
  const handleDeleteTrainer = (id: number) => {
    setTrainers(trainers.filter((trainer) => trainer.id !== id))
    if (selectedTrainer && selectedTrainer.id === id) {
      setSelectedTrainer(null)
      setIsEditing(false)
    }
  }

  // Handle selecting a trainer for editing
  const handleEditTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer)
    setIsEditing(true)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle form cancel
  const handleCancel = () => {
    setSelectedTrainer(null)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <TrainersHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trainers List */}
          <div>
            <TrainersList
              trainers={filteredTrainers}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onEdit={handleEditTrainer}
              onDelete={handleDeleteTrainer}
            />
          </div>

          {/* Trainer Form */}
          <div>
            <TrainerForm
              trainer={selectedTrainer}
              isEditing={isEditing}
              onAdd={handleAddTrainer}
              onUpdate={handleUpdateTrainer}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
