
// Interfaz capacitation para la base de datos

import { ObjectId } from "mongoose";

interface ICapacitation {
    name: string;
    description: string;
    createAt: string;
    Admin: ObjectId;
    enterprise: ObjectId;
}

export default ICapacitation;
