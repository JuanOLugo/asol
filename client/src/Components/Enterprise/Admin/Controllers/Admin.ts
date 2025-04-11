import axios from "axios"
import IAdmin from "../Interfaces/Admin"
import { API_URL_Admin } from "../../../../Config/AxiosConfigClient/ConfigAuth"

class AdminControllers{
    public async CreateAdmin(formData: Omit<IAdmin, "enterprise">){
        const response = await axios.post(API_URL_Admin + "/register", formData)
        return response.data
    }

    public async LoginAdmin(formData: Omit<IAdmin, "enterprise" | "createAt" | "lastName" | "name">){
        const response = await axios.post(API_URL_Admin + "/login", formData)
        return response.data
    }
}

const AdminController = new AdminControllers()
export default AdminController