import { ObjectId } from "mongoose";

interface IEnterprise {
    name: string;
    description: string;
    email: string;
    password: string;
    createAt: string;
}

export default IEnterprise;
