import { Request, Response } from "express";
import CourseRepository from "../../../Domain/Repositories/Course";

const courseRepository = new CourseRepository();

class CourseController {
  public async createCourse(req: Request, res: Response): Promise<void> {
    const course = req.body;
    try {
      const courseCreated = await courseRepository.createCourse(course);
      res.status(201).json(courseCreated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateCourse(req: Request, res: Response): Promise<void> {
    const course = req.body;
    const courseId = req.params.id;
    try {
      const courseUpdated = await courseRepository.updateCourse(courseId, course);
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
