import axios from "axios"
import { API_URL_Developer} from "../../../Config/AxiosConfigClient/ConfigAuth"
import IDeveloper from "../Interfaces/Developer"

class DeveloperController{
    public async getCode(formData: Omit<IDeveloper, "code">){
        const response = await axios.post(API_URL_Developer+ "/get-entity", formData)
        return response.data
    }
    public async verifyEmail(formData: IDeveloper){
        const response = await axios.post(API_URL_Developer+ "/verify-entity", formData)
        return response.data
    }
}

const developerController = new DeveloperController()
export default developerController