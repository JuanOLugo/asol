"use client";

import { useEffect, useState } from "react";
import { CoursesHeader } from "../Components/CoursesHeader";
import { CourseSlider } from "../Components/CourseSlider";
import { Course } from "../Interfaces/ICourse";
import CourseRepository from "../Repository/Course";
import CourseController from "../Controllers/Course";
// Mock course data

const { GetCourseInformation } = new CourseController();
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { handleDeleteCourse, handleEditCourse } = new CourseRepository();

  useEffect(() => {
    GetCourseInformation().then((res) => {
      const response = res.workshops.map((e: any) => {
        return {
          ...e,
          questions: res.questions.filter((q: any) => q.workshop._id === e._id),
          course: res.courses.find((c: any) => c._id === e.course._id),
        };
      });
      const organizeSection = response.map((c: any) => {
        return {
          course: {...c.course, questions: c.questions},
        };
      });

      console.log(organizeSection)

      setCourses(
        organizeSection
          .map((c: any) => c.course)
          .map((c: any) => {
            return {
              ...c,
              capacityType: c.capacityType[0],
              
            };
          })
      );
    });
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <CoursesHeader />
        <CourseSlider
          courses={courses}
          onDelete={(id) => handleDeleteCourse(id, setCourses, courses)}
          onEdit={(id) => handleEditCourse(id)}
        />
      </div>
    </div>
  );
}
