"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { CourseSliderProps } from "../Interfaces/ICourse";
import CourseSliderRepository from "../Repository/CourseSlider";

export function CourseSlider({ courses, onDelete, onEdit }: CourseSliderProps) {
  const { goToNext, goToPrevious, handleResize } = new CourseSliderRepository();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update cards per view based on screen size
  useEffect(() => {
    // Initial call
    handleResize(setCardsPerView);

    // Add event listener
    window.addEventListener("resize", () => handleResize(setCardsPerView));

    // Cleanup
    return () => {
      window.removeEventListener("resize", () => handleResize(setCardsPerView));
    };
  }, []);

  const totalSlides = Math.max(0, courses.length - cardsPerView + 1);

  // Calculate if buttons should be disabled
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex >= totalSlides - 1 || courses.length <= cardsPerView;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Lista de Cursos</h2>
        <div className="flex gap-2">
          <button
            onClick={() => goToPrevious(setCurrentIndex)}
            disabled={isPrevDisabled}
            className={`p-2 rounded-full ${
              isPrevDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goToNext(setCurrentIndex, totalSlides)}
            disabled={isNextDisabled}
            className={`p-2 rounded-full ${
              isNextDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden ">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out w-full"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <CourseCard
                course={course}
                onDelete={() => onDelete(course._id)}
                onEdit={() => onEdit(course._id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
