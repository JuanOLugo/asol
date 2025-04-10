import axios from "axios";
import {API_URL_Enterprise } from "../../../../Config/AxiosConfigClient/ConfigAuth";
const token = window.localStorage.getItem("enterprise-session")
axios.defaults.withCredentials = true
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
class NavbarController {
    public async getEnterpriseInfo() {
        const response = await axios.post(`${API_URL_Enterprise}/get`)
        return response.data
    }
}

export default new NavbarController()


