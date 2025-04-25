import { UploadedFile } from "express-fileupload";
import path from "path"
import fs from "fs"
import ICourse from "../Interfaces/Db Interfaces/ICourse";
class CourseEntity{

    public async SaveCourseFiles(uploadedFile: UploadedFile[], course: any) {
        const dirPath = path.join(__dirname + "../../../../public/Files/");
        if (fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath + "course-" + course._id, { recursive: true });
        }

        try {
            const uploadate = uploadedFile.map((f) => {
                const fileName = "course-" + course.name + f.name + path.extname(f.name);
                const filePath = path.join(dirPath + "course-" + course._id, fileName);
                f.mv(filePath, (err) => (err ? new Error(err): f));
              });
      
              return uploadate
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CourseEntity