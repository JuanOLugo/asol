import mongoose, { ObjectId } from "mongoose";

interface IUser {
    dni: string;
    name: string;
    lastName: string;
    password: string;
    enterprise: mongoose.Types.ObjectId;
    title: string;
    category: string;
    capacitation: string;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId[];
}

export default IUser;
