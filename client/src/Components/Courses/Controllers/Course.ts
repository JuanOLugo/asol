import axios from "axios";
import { API_URL_Course } from "../../../Config/AxiosConfigClient/ConfigAuth";
import { ICourseData } from "../Interfaces/ICoursesController";

class CourseController {
  public async CreateCourse(data: FormData) {
    const response = await axios.post(API_URL_Course + "/create", data);
    return response.data;
  }

  public async UpdateCourse(data: FormData) {
    const response = await axios.post(API_URL_Course + "/update", data);
    return response.data;
  }

  public async GetCourseInformation() {
    const response = await axios.get(API_URL_Course + "/all");
    return response.data;
  }

  public async DeleteCourse(id: string) {
    const response = await axios.delete(API_URL_Course + "/delete/" + id);
    return response.data;
  }

  public async GetIndividualCourse(id: string) {
    const response = await axios.get(
      API_URL_Course + "/individualcourse/" + id
    );
    return response.data;
  }
}

export default CourseController;
