import axios from "axios";
import { API_URL_Capacitation } from "../../../Config/AxiosConfigClient/ConfigAuth";

class CapacitationControllers {
    public async CreateCapacitation({name, description, createdAt, adminId, categoryId}: {name: string, description: string, createdAt: string, adminId: string, categoryId: string}) {
        const response = await axios.post(`${API_URL_Capacitation}/create`, {name, description, createdAt, adminId, categoryId})
        return response.data;
    }
    public async DeleteCapacitation(id: string) {
        const response = await axios.delete(`${API_URL_Capacitation}/delete/${id}`)
        return response.data;
    }
    public async UpdateCapacitation({id, name, categoryId, adminId}: {id: string, name: string, categoryId: string, adminId: string}) {
        const response = await axios.post(`${API_URL_Capacitation}/update`, {id, name, categoryId, adminId})
        return response.data;
    }
}

export default CapacitationControllers;

