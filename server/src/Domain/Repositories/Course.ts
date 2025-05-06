import mongoose from "mongoose";
import AnswerModel from "../../Infrestructure/Db/Models/Answer";
import CourseModel from "../../Infrestructure/Db/Models/Course";
import WorkshopModel from "../../Infrestructure/Db/Models/Workshop";
import WorkshopQuestionsModel from "../../Infrestructure/Db/Models/WorkshopQuestions";
import ICourse from "../Interfaces/Db Interfaces/ICourse";
import AnswerRpository from "./Answer";
const answerRepository = new AnswerRpository();
class CourseRepository {
  public async createCourse(course: ICourse): Promise<ICourse> {
    const courseCreating = await CourseModel.create(course);
    if (!courseCreating) throw new Error("Error al crear el curso");
    return await courseCreating.save();
  }

  public async getCourseById(id: string, enterpriseId: string): Promise<any> {
    const course = await CourseModel.findOne({
      _id: id,
      enterprise: enterpriseId,
    })
      .populate("category")
      .populate("capacityType")
      .populate("Admin");
    const workshop = await WorkshopModel.findOne({ course: course?._id })
      .populate("course")
      .populate("Admin");
    const questions = await WorkshopQuestionsModel.find({
      workshop: workshop?._id,
    })
      .populate("answers")
      .populate("correctAnswer")
      .populate("Admin")
      .populate("workshop");
    if (!course) throw new Error("Curso no encontrado");
    return {
      course,
      workshop,
      questions,
    };
  }

  public async getAllCourses(enterpriseId: string): Promise<any> {
    const courses = await CourseModel.find({ enterprise: enterpriseId })
      .populate("category")
      .populate("capacityType")
      .populate("Admin");
    const workshops = await WorkshopModel.find({ enterprise: enterpriseId })
      .populate("course")
      .populate("Admin");
    const questions = await WorkshopQuestionsModel.find({
      enterprise: enterpriseId,
    })
      .populate("answers")
      .populate("correctAnswer")
      .populate("Admin")
      .populate("workshop");
    if (!courses || !workshops || !questions)
      throw new Error("Error al obetener datos");
    return { courses, workshops, questions };
  }

  public async updateCourse(courseId: string, Course: any, enterpriseId: string, admin: string): Promise<any> {
    console.log(Course.questions);
    // filtrar curso y actualizar
    const course = await CourseModel.findByIdAndUpdate(courseId, {
      name: Course.name,
      description: Course.description,
      title: Course.title,
      capacityType: Course.capacityType.map((c: any) => new mongoose.Types.ObjectId(c)),
      category: new mongoose.Types.ObjectId(Course.category),
    });
    if (!course) throw new Error("Error al actualizar el curso");
    //filtrar workshop por curso y actualizar
    const workshop = await WorkshopModel.findOneAndUpdate(
      {
        course: course?._id,
      },
      {
        name: Course.name,
        description: Course.description,
        title: Course.title,
        capacityType: Course.capacityType.map((c: any) => new mongoose.Types.ObjectId(c)),
        category: new mongoose.Types.ObjectId(Course.category),
      }
    );
    if (!workshop) throw new Error("Error al actualizar el workshop");
    //filtrar preguntas por workshops
    const questions = await WorkshopQuestionsModel.find({
      workshop: workshop?._id,
    });

    // filtrar respuestas por pregunta y eliminar
    for (let q of questions) {
      await Promise.all(
        q.answers.map(async (a) => {
          await AnswerModel.findByIdAndDelete(a);
        })
      );
      // eliminar pregunta
      await WorkshopQuestionsModel.findByIdAndDelete(q._id);
    }

    // crear preguntas nuevas
    const questionsToCreate = Course.questions.map(async (q: any) => {
      const answers = await Promise.all(
        q.options.map(async (a: any, i: number) => { 
          console.log(a, " ldalsdl lsdalsdlalsd asdlalsdl")
          const newAnswer = await answerRepository.CreateAnswer({ name: a });
          if (q.correctAnswer === i) {
            q.correctAnswer = newAnswer._id;
          }
          return newAnswer._id;
        })
      );
      console.log(answers);
      return {
        question: q.question,
        answers: answers,
        correctAnswer: q.correctAnswer,
        workshop: workshop?._id,
        Admin: admin,
        enterprise: enterpriseId,
      };
    });

    const questionsCreated = await Promise.all(questionsToCreate);
    const workshopQuestionCreating = await WorkshopQuestionsModel.create(questionsCreated)
    if (!workshopQuestionCreating) throw new Error("Error al crear las preguntas");

    return {
      course: course,
      workshop: workshop,
      questions: workshopQuestionCreating,
    }

    
  }

  public async deleteCourse(id: string, enterpriseId: string): Promise<void> {
    const courseDeleting = await CourseModel.findOneAndDelete({
      _id: id,
      enterprise: enterpriseId,
    });
    const workshopDeleting = await WorkshopModel.findOneAndDelete({
      course: id,
      enterprise: enterpriseId,
    });
    const workshopQuestionDeleting =
      await WorkshopQuestionsModel.findOneAndDelete({
        workshop: workshopDeleting?._id,
        enterprise: enterpriseId,
      });

    if (!workshopQuestionDeleting?.answers)
      throw new Error("Error no existe ninguna pregunta");
    await Promise.all(
      workshopQuestionDeleting?.answers.map((a) => {
        return AnswerModel.findByIdAndDelete(a);
      })
    );
    if (!courseDeleting || !workshopDeleting || !workshopQuestionDeleting)
      throw new Error("Error al eliminar el curso");
  }
}

export default CourseRepository;
