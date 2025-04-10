import axios from "axios";
import { API_URL_Enterprise } from "../../../../Config/AxiosConfigClient/ConfigAuth";
import IEnterprise from "../Interfaces/IEnterprise";

export class AuthController {
    public async Login({email, password}: {email: string, password: string}) {
        const response = await axios.post(API_URL_Enterprise + "/login", {email, password});
        return response.data;
    }

    public async Register(Enterprise: IEnterprise) {
        const response = await axios.post(API_URL_Enterprise + "/register", {...Enterprise});
        return response.data;
    }
}

export default new AuthController();
