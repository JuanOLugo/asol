import mongoose, { ObjectId } from "mongoose";

interface IUser {
    dni: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    enterprise: mongoose.Types.ObjectId;
    title: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    capacitation: mongoose.Types.ObjectId;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId[];
}

export default IUser;
