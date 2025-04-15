import { API_URL_Title } from "../../../Config/AxiosConfigClient/ConfigAuth";
import axios from "axios";
class TitleController {
    public async CreateTitle({name, description, adminId}: {name: string, description: string, adminId: string}) {
        const response = await axios.post(`${API_URL_Title}/create`, {name, description, adminId})
        return response.data;
    }
}

export default TitleController;
