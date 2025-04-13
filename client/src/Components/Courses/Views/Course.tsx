"use client"

import { useState } from "react"
import { CoursesHeader } from "../Components/CoursesHeader"
import { CourseSlider } from "../Components/CourseSlider"
import { Course } from "../Interfaces/ICourse"
import CourseRepository from "../Repository/Course"
// Mock course data
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Introducción a la Programación",
    description: "Curso básico para aprender los fundamentos de la programación.",
    type: "Tecnología",
    questionCount: 25,
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Aprende estrategias efectivas para promocionar productos y servicios en línea.",
    type: "Marketing",
    questionCount: 30,
  },
  {
    id: 3,
    title: "Gestión de Proyectos",
    description: "Metodologías y herramientas para la gestión eficiente de proyectos.",
    type: "Administración",
    questionCount: 20,
  },
  {
    id: 4,
    title: "Diseño UX/UI",
    description: "Principios y prácticas para crear interfaces de usuario efectivas y atractivas.",
    type: "Diseño",
    questionCount: 35,
  },
  {
    id: 5,
    title: "Análisis de Datos",
    description: "Técnicas para analizar e interpretar datos para la toma de decisiones.",
    type: "Tecnología",
    questionCount: 28,
  },
  {
    id: 6,
    title: "Liderazgo y Gestión de Equipos",
    description: "Habilidades para liderar equipos y gestionar el talento humano.",
    type: "Recursos Humanos",
    questionCount: 22,
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses)
  const { handleDeleteCourse, handleEditCourse } = new CourseRepository();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CoursesHeader />
        <CourseSlider courses={courses} onDelete={(id) => handleDeleteCourse(id, setCourses, courses)} onEdit={(id) => handleEditCourse(id)} />
      </div>
    </div>
  )
}
