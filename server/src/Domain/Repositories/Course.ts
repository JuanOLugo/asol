import CourseModel from "../../Infrestructure/Db/Models/Course";
import ICourse from "../Interfaces/Db Interfaces/ICourse";
class CourseRepository {
    public async createCourse(course: ICourse): Promise<ICourse> {
        const courseCreating = await CourseModel.create(course);
        if (!courseCreating) throw new Error("Error al crear el curso");
        return await courseCreating.save()
    }

    public async getCourseById(id: string): Promise<ICourse> {
        const course = await CourseModel.findById(id);
        if (!course) throw new Error("Curso no encontrado");
        return course;
    }

    public async getAllCourses(enterpriseId: string): Promise<ICourse[]> {
        const courses = await CourseModel.find({ enterprise: enterpriseId });
        if (!courses) throw new Error("No hay cursos");
        return courses;
    }
    
    public async updateCourse(id: string, course: ICourse): Promise<ICourse> {
        const courseUpdating = await CourseModel.findByIdAndUpdate(id, course);
        if (!courseUpdating) throw new Error("Error al actualizar el curso");
        return courseUpdating;
    }

    public async deleteCourse(id: string): Promise<void> {
        const courseDeleting = await CourseModel.findByIdAndDelete(id);
        if (!courseDeleting) throw new Error("Error al eliminar el curso");
    }
    
    
}

export default CourseRepository;
