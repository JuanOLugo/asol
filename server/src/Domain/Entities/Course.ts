import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import ICourse from "../Interfaces/Db Interfaces/ICourse";
const dir = path.join(__dirname, "../../../public/Files");

class CourseEntity {
  public async SaveCourseFiles(uploadedFile: UploadedFile[], course: any) {
    const dirPath = path.join(__dirname + "../../../../public/Files/");
    if (fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath + "course-" + course._id, { recursive: true });
    }

    try {
      const uploadate = uploadedFile.map((f) => {
        const fileName = f.name + path.extname(f.name);
        const filePath = path.join(dirPath + "course-" + course._id, fileName);
        f.mv(filePath, (err) => (err ? new Error(err) : f));
      });

      return uploadate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async DeleteCourseFiles(courseID: String) {
    if (fs.existsSync(dir + "/course-" + courseID)) {
      try {
        fs.rmSync(dir + "/course-" + courseID, {
          recursive: true,
          force: true,
        });
        console.log("Eliminado correctamente", "/course-" + courseID);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public GetFilesByCourse(courseID: string): any[] {
    const results = [];

    if (!fs.existsSync(dir + "/course-" + courseID)) return [];
    const files = fs.readdirSync(dir + "/course-" + courseID);

    for (const file of files) {
      const filePath = path.join(dir + "/course-" + courseID, file);
      const stats = fs.statSync(filePath);
      results.push({
        name: file,
        path: filePath,
        type: stats.isDirectory() ? "folder" : "file",
        size: stats.size,
        extension: path.extname(file),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
      });
      if (stats.isDirectory()) {
        results.push(...this.GetFilesByCourse(filePath));
      }
    }

    return results;
  }

  public DeleteFiles(files: string[], courseID: string) {
    for(let i = 0 ; i < (files.length > 0 ? files.length : 10); i++){
      const file = files[i] || "undefined";
      const filePath = path.join(dir + "/course-" + courseID);
      fs.readdir(filePath, (err, files) => {
        if(err) return false;
        files.forEach((f) => {
          if (f !== file) {
            fs.unlink(path.join(filePath, f), (err) => {
              if (err) false
            });
          }
        });
      });
    }
  }

}

export default CourseEntity;
