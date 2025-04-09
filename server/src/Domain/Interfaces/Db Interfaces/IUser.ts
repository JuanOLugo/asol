import { ObjectId } from "mongoose";

interface IUser {
    dni: string;
    name: string;
    lastName: string;
    password: string;
    enterprise: ObjectId;
    title: string;
    category: string;
    capacitation: string;
    createAt: string;
    Admin: ObjectId;
    course: ObjectId[];
}

export default IUser;
