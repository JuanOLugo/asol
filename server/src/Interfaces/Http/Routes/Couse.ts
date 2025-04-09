import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import CourseController from "../Controllers/Couse";

const CourseRouter = Router();

CourseRouter.post(
  "/create",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().createCourse
);
CourseRouter.put(
  "/update/:id",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().updateCourse
);
CourseRouter.delete(
  "/delete/:id",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().deleteCourse
);
CourseRouter.get(
  "/:id",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().getCourseById
);
CourseRouter.get(
  "/all/:enterpriseId",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().getAllCourses
);

export default CourseRouter;
