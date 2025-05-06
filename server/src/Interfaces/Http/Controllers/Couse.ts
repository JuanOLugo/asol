import { json, Request, Response } from "express";
import CourseRepository from "../../../Domain/Repositories/Course";
import path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import CourseEntity from "../../../Domain/Entities/Course";
import AdminEntity from "../../../Domain/Entities/Admin";
import mongoose, { mongo, Mongoose } from "mongoose";
import CourseModel from "../../../Infrestructure/Db/Models/Course";
import WorkShopRepository from "../../../Domain/Repositories/Workshop";
import WorkshopQuestionsRepository from "../../../Domain/Repositories/WorshopQuestions";
import Answer from "../../../Domain/Interfaces/Db Interfaces/Answer";
import AnswerRpository from "../../../Domain/Repositories/Answer";
const adminEntity = new AdminEntity();
const courseRepository = new CourseRepository();
const courseEntity = new CourseEntity();
const workShopRepository = new WorkShopRepository();
const workshopQuestionRepository = new WorkshopQuestionsRepository();
const answerRepository = new AnswerRpository();
class CourseController {
  public async createCourse(req: Request, res: Response): Promise<any> {
    const EnterpriseId: string = (req.user as { _id: string })._id;
    const course = JSON.parse(req.body.data);
    let uploadedFile: UploadedFile[] = [];
    const adminId = await adminEntity.DeserializeAdminToken(course.Admin);

    try {
      const courseToAdd = {
        name: course.name as string,
        description: course.description as string,
        createAt: course.createAt as string,
        capacityType: course.capacityType.map(
          (e: string) => new mongoose.Types.ObjectId(e)
        ) as mongoose.Types.ObjectId[],
        enterprise: new mongoose.Types.ObjectId(EnterpriseId),
        Admin: new mongoose.Types.ObjectId(adminId),
        category: new mongoose.Types.ObjectId(course.category),
        title: "local",
      };
      const newCourse = await courseRepository.createCourse(courseToAdd);

      if (!req.files || !req.files.file) console.log("No archivos");
      else {
        if (req.files.file instanceof Array) uploadedFile = [...req.files.file];
        else uploadedFile.push(req.files.file);
        try {
          const filesSaveResponse = await courseEntity.SaveCourseFiles(
            uploadedFile,
            newCourse
          );
        } catch (error) {
          return res.status(404).send("Error al guardar archivos");
        }
      }

      const newWorshop = await workShopRepository.CreateWorshop({
        title: newCourse.name,
        description: newCourse.description,
        Admin: new mongoose.Types.ObjectId(adminId),
        createAt: course.createAt,
        enterprise: newCourse.enterprise,
        finishAt: newCourse.createAt,
        position: 0,
        course: (
          (await CourseModel.findOne(newCourse)) as {
            _id: mongoose.Types.ObjectId;
          }
        )._id,
      });

      for (let q of course.questions) {
        const options = await Promise.all(
          q.options.map(async (op: string, i: number) => {
            const newAnswer = await answerRepository.CreateAnswer({ name: op });
            if (q.correctAnswer === i) {
              q.correctAnswer = newAnswer._id;
            }
            return newAnswer._id;
          })
        );
        q.options = options;

        const newQuestion = workshopQuestionRepository.CreateQuestion({
          question: q.question,
          Admin: new mongoose.Types.ObjectId(adminId),
          answers: q.options,
          correctAnswer: q.correctAnswer,
          enterprise: new mongoose.Types.ObjectId(EnterpriseId),
          workshop: newWorshop._id,
        });
      }
    } catch (error) {
      res.status(200).send({ msg: "Error al crear el curso", error });
    }

    res.status(200).send("Curso creado correctamente");
  }

  public async updateCourse(req: Request, res: Response): Promise<void> {
    const EnterpriseId: string = (req.user as { _id: string })._id;
    const course = JSON.parse(req.body.data);
    let uploadedFile: UploadedFile[] = [];
    const adminId = await adminEntity.DeserializeAdminToken(course.Admin);

    //File upload and delete
    if (!req.files?.file || !req.files) console.log("No archivos");
    if (!course.files) console.log("No hay archivos para eliminar");
    else {
      courseEntity.DeleteFiles(
        course.files.map((f: any) => f.name),
        course._id
      );
      if (req.files?.file instanceof Array) uploadedFile = [...req.files.file];
      else if (req.files?.file) uploadedFile.push(req.files.file);
      
      courseEntity.SaveCourseFiles(uploadedFile, course);
    }
    //Course update
    try {
      const courseUpdated = await courseRepository.updateCourse(course._id, course, EnterpriseId, adminId);
      console.log(courseUpdated)
      res.status(200).send("Curso actualizado correctamente");
    } catch (error) {
      console.log(error)
    }
    
  }

  public async deleteCourse(req: Request, res: Response): Promise<void> {
    const courseId = req.params.id;
    const enterpriseId = (req.user as { _id: string })._id;
    try {
      const courseDeleted = await courseRepository.deleteCourse(
        courseId,
        enterpriseId
      );
      courseEntity.DeleteCourseFiles(courseId);
      res.status(200).json(courseDeleted);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getCourseById(req: Request, res: Response): Promise<void> {
    const courseId = req.params.id;
    const enterpriseId = (req.user as { _id: string })._id;
    try {
      const courseById = await courseRepository.getCourseById(
        courseId,
        enterpriseId
      );
      const files = courseEntity.GetFilesByCourse(courseId);
      res.status(200).json({
        ...courseById,
        files,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getAllCourses(req: Request, res: Response): Promise<void> {
    const enId = (req.user as { _id: string })._id;
    try {
      const courses = await courseRepository.getAllCourses(enId);
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default CourseController;
