"use client"

import { Edit, Trash2, BookOpen, HelpCircle } from "lucide-react"
import { CourseCardProps } from "../Interfaces/ICourse"

export function CourseCard({ course, onDelete, onEdit}: CourseCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full flex flex-col transition-transform hover:shadow-md hover:-translate-y-1">
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{course.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>

        <div className="flex items-center gap-2 ">
          <BookOpen size={16} className="text-blue-600" />
          <span className="text-sm text-gray-700">Tipo: {course.capacityType.name}</span>
        </div>

        <div className="flex items-center gap-2 my-2">
          <HelpCircle size={16} className="text-blue-600" />
          <span className="text-sm text-gray-700">Preguntas: {course.questions.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <HelpCircle size={16} className="text-blue-600" />
          <span className="text-sm text-gray-700">Capacitador: {course.Admin.name} {course.Admin.lastName}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <Edit size={16} />
          <span>Editar</span>
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          <Trash2 size={16} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}
