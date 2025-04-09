// Interfaz categoria para la base de datos

import mongoose, { ObjectId } from "mongoose";

interface ICategory {
    name: string;
    description: string;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
}

export default ICategory;
