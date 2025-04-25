import axios from "axios"
import { API_URL_Course } from "../../../Config/AxiosConfigClient/ConfigAuth"
import { ICourseData } from "../Interfaces/ICoursesController"

class CourseController {
    public async CreateCourse(data: FormData) {
        const response = await axios.post(API_URL_Course + "/create", data)
        return response.data
    }

    public async GetCourseInformation() {
        const response = await axios.get(API_URL_Course + "/all")
        return response.data
    }
}

export default CourseController