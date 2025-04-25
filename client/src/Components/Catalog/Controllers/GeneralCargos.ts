import { API_URL_GeneralTitle, API_URL_Title } from "../../../Config/AxiosConfigClient/ConfigAuth";
import axios from "axios";
class GeneralTitleController {
    public async CreateTitle({name, description, adminId}: {name: string, description: string, adminId: string}) {
        const response = await axios.post(`${API_URL_GeneralTitle}/create`, {name, description, adminId})
        return response.data;
    }

    public async UpdateTitle({id, name, description, adminId}: {id: string, name: string, description: string, adminId: string}) {
        const response = await axios.post(`${API_URL_GeneralTitle}/update`, {id, name, description, adminId})
        return response.data;
    }

    public async DeleteTitle({id}: {id: string}) {
        const response = await axios.delete(`${API_URL_GeneralTitle}/delete/${id}`)
        return response.data;
    }
    
}

export default GeneralTitleController;
