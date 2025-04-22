import { json, Request, Response } from "express";
import CourseRepository from "../../../Domain/Repositories/Course";
import path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
const courseRepository = new CourseRepository();

class CourseController {
  public async createCourse(req: Request, res: Response): Promise<any> {
    const course = JSON.parse(req.body.data);
    if (!req.files || !req.files.file)
      res.status(404).send("Error, no archivos");
    const dirPath = path.join(__dirname + "../../../../../public/Files/");

    const uploadedFile = req.files?.file as UploadedFile[];
    if (fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath + "course-" + course.name, { recursive: true });
    }

    const uploadate = uploadedFile.map((f) => {
      const fileName = "course-" + course.name + f.name + path.extname(f.name);
      const filePath = path.join(dirPath + "course-" + course.name, fileName);
      f.mv(filePath, (err) => (err ? console.log(err) : f));
    });

    console.log(uploadate);
  }

  public async updateCourse(req: Request, res: Response): Promise<void> {
    const course = req.body;
    const courseId = req.params.id;
    try {
      const courseUpdated = await courseRepository.updateCourse(
        courseId,
        course
      );
      res.status(200).json(courseUpdated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteCourse(req: Request, res: Response): Promise<void> {
    const courseId = req.params.id;
    try {
      const courseDeleted = await courseRepository.deleteCourse(courseId);
      res.status(200).json(courseDeleted);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getCourseById(req: Request, res: Response): Promise<void> {
    const courseId = req.params.id;
    try {
      const courseById = await courseRepository.getCourseById(courseId);
      res.status(200).json(courseById);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getAllCourses(req: Request, res: Response): Promise<void> {
    const enterpriseId = req.params.enterpriseId;
    try {
      const courses = await courseRepository.getAllCourses(enterpriseId);
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default CourseController;
