import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import CourseController from "../Controllers/Couse";
import { uploadMulter } from "../../../Infrestructure/Files/Multer.cfg";
import fileUpload from "express-fileupload";
const CourseRouter = Router();

CourseRouter.post(
  "/create",
  passportConfig.authenticate("jwt", { session: false }),
  fileUpload(),
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
  "/all",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().getAllCourses
);

CourseRouter.get(
  "/individualcourse/:id",
  passportConfig.authenticate("jwt", { session: false }),
  new CourseController().getCourseById
);

export default CourseRouter;
