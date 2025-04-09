import mongoose, { ObjectId } from "mongoose";

interface IWorkshop {
    title: string;
    description: string;
    createAt: string;
    finishAt: string;
    enterprise: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    position: number;
}

export default IWorkshop;
