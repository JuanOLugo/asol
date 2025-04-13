import { Course } from "../Interfaces/ICourse";

class CourseRepository {
    public handleDeleteCourse = (id: number, setCourses: React.Dispatch<React.SetStateAction<Course[]>>, courses: Course[]) => {
        setCourses(courses.filter((course) => course.id !== id))
      }
    
      public handleEditCourse = (id: number) => {
        // In a real app, this would open an edit form or modal
        console.log(`Editing course with ID: ${id}`)
      }
}

export default CourseRepository;
