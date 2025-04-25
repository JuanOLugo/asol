import { API_URL_Admin } from "../../../Config/AxiosConfigClient/ConfigAuth";
import axios from "axios";
class AdminControllers {
    public async GetCatalog() {
        const response = await axios.post(`${API_URL_Admin}/get-catalog`);
        return response.data;
    }
}

export default AdminControllers;

