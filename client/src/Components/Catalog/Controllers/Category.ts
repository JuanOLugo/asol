import axios from "axios";
import { API_URL_Category } from "../../../Config/AxiosConfigClient/ConfigAuth";

class CategoryController  {
    public async CreateCategory({name, description, adminId}: {name: string, description: string, adminId: string}) {
        const response = await axios.post(`${API_URL_Category}/create`, {name, description, adminId})
        return response.data;
    }

    public async DeleteCategory(categoryId: string) {
        const response = await axios.delete(`${API_URL_Category}/delete/` + categoryId)
        return response.data;
    }

    public async UpdateCategory(categoryId: string, {name, description, adminId}: {name: string, description: string, adminId: string}) {
        const response = await axios.post(`${API_URL_Category}/update`, {categoryId, name, description, adminId})
        return response.data;
    }
}

export default CategoryController;

