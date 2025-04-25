"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface QuestionCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onAddQuestion: (question: Question) => void
  onDeleteQuestion: (questionId: string) => void
  questions: Question[]
}

export function QuestionCreationModal({
  isOpen,
  onClose,
  onAddQuestion,
  onDeleteQuestion,
  questions,
}: QuestionCreationModalProps) {
  // Form state
  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)
  const [error, setError] = useState("")

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!isOpen) return null

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!questionText.trim()) {
      setError("Por favor ingresa la pregunta")
      return
    }

    const emptyOptions = options.filter((option) => !option.trim()).length
    if (emptyOptions > 0) {
      setError("Por favor completa todas las opciones")
      return
    }

    if (correctAnswer === null) {
      setError("Por favor selecciona la respuesta correcta")
      return
    }

    // Create new question
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      question: questionText,
      options: [...options],
      correctAnswer,
    }

    // Add question
    onAddQuestion(newQuestion)

    // Reset form
    setQuestionText("")
    setOptions(["", "", "", ""])
    setCorrectAnswer(null)
  }

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // Handle correct answer selection
  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswer(index)
  }

  // Slider navigation
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => Math.min(questions.length - 1, prev + 1))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-green-50 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Crear Preguntas</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question Form */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Nueva Pregunta</h4>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Question Text */}
                <div className="space-y-2">
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                    Pregunta
                  </label>
                  <input
                    id="question"
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Escribe la pregunta aquí"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Opciones</label>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="correctAnswer"
                        checked={correctAnswer === index}
                        onChange={() => handleCorrectAnswerChange(index)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  ))}
                  <p className="text-sm text-gray-500">Selecciona la opción correcta</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Plus size={18} />
                  <span>Añadir Pregunta</span>
                </button>
              </form>
            </div>

            {/* Questions List/Slider */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Preguntas Creadas ({questions.length})</h4>

              {questions.length === 0 ? (
                <div className="bg-gray-50 rounded-md p-8 text-center border border-gray-200">
                  <p className="text-gray-500">No hay preguntas creadas aún</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  {/* Question Slider */}
                  <div className="bg-gray-50 p-4">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-800">
                            Pregunta {currentSlide + 1} de {questions.length}
                          </h5>
                          <p className="text-gray-700">{questions[currentSlide].question}</p>
                          <div className="space-y-2">
                            {questions[currentSlide].options.map((option, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded-md ${
                                  questions[currentSlide].correctAnswer === index
                                    ? "bg-green-100 border border-green-300"
                                    : "bg-white border border-gray-200"
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm mr-2">
                                    {index + 1}
                                  </span>
                                  <span
                                    className={
                                      questions[currentSlide].correctAnswer === index
                                        ? "text-green-800 font-medium"
                                        : "text-gray-700"
                                    }
                                  >
                                    {option}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={goToPrevSlide}
                          disabled={currentSlide === 0}
                          className={`p-1 rounded-full ${
                            currentSlide === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <div className="flex space-x-1">
                          {questions.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2 h-2 rounded-full ${
                                currentSlide === index ? "bg-green-600" : "bg-gray-300"
                              }`}
                              aria-label={`Go to question ${index + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={goToNextSlide}
                          disabled={currentSlide === questions.length - 1}
                          className={`p-1 rounded-full ${
                            currentSlide === questions.length - 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteQuestion(questions[currentSlide].id)}
                        className="absolute top-0 right-0 p-1 text-red-600 hover:bg-red-100 rounded-full"
                        aria-label="Delete question"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
