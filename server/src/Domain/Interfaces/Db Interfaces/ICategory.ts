// Interfaz categoria para la base de datos

import { ObjectId } from "mongoose";

interface ICategory {
    name: string;
    description: string;
    createAt: string;
    Admin: ObjectId;
    enterprise: ObjectId;
}

export default ICategory;
