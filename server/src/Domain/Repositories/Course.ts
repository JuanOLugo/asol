import CourseModel from "../../Infrestructure/Db/Models/Course";
import WorkshopModel from "../../Infrestructure/Db/Models/Workshop";
import WorkshopQuestionsModel from "../../Infrestructure/Db/Models/WorkshopQuestions";
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

    public async getAllCourses(enterpriseId: string): Promise<any> {
        const courses = await CourseModel.find({ enterprise: enterpriseId }).populate("category").populate("capacityType").populate("Admin")
        const workshops = await WorkshopModel.find({enterprise: enterpriseId}).populate("course").populate("Admin")
        const questions = await WorkshopQuestionsModel.find({enterprise: enterpriseId}).populate("answers").populate("correctAnswer").populate("Admin").populate("workshop")
        if (!courses || !workshops || !questions) throw new Error("Error al obetener datos");
        return {courses, workshops, questions};
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
