import IEnterprise from "../../Interfaces/Enterprise";

interface IAdmin {
    dni: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    createAt: string;
    enterprise: IEnterprise
}

export default IAdmin;

