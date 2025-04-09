
// Interfaz capacitation para la base de datos

import mongoose, { ObjectId } from "mongoose";

interface ICapacitation {
    name: string;
    description: string;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
}

export default ICapacitation;
