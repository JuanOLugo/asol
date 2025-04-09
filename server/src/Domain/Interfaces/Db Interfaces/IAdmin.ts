import { ObjectId } from "mongoose";

// Interfaz admin para la base de datos

interface IAdmin {
    dni: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    createAt: string;
    enterprise: ObjectId;
}

export default IAdmin;
