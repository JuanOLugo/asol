"use client"

import { Edit, Trash2 } from "lucide-react"
import { TrainerCardProps } from "../Interface/Trainer"


export function TrainerCard({ trainer, onEdit, onDelete }: TrainerCardProps) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-800">
            {trainer.name} {trainer.lastName}
          </h3>
          <p className="text-sm text-gray-500">{trainer.email}</p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {trainer.cargo}
            </span>
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(trainer)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Editar"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(trainer.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
