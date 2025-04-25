import { API_URL_Title } from "../../../Config/AxiosConfigClient/ConfigAuth";
import axios from "axios";
class TitleController {
    public async CreateTitle({name, description, adminId, cargoGeneralId}: {name: string, description: string, adminId: string, cargoGeneralId: string}) {
        const response = await axios.post(`${API_URL_Title}/create`, {name, description, adminId, cargoGeneralId    })
        return response.data;
    }

    public async UpdateTitle({id, name, description, adminId, categoryId}: {id: string, name: string, description: string, adminId: string, categoryId: string}) {
        const response = await axios.post(`${API_URL_Title}/update`, {id, name, description, adminId, categoryId })
        return response.data;
    }

    public async DeleteTitle({id}: {id: string}) {
        const response = await axios.delete(`${API_URL_Title}/delete/${id}`)
        return response.data;
    }
    
}

export default TitleController;
