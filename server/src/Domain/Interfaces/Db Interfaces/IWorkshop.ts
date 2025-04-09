import { ObjectId } from "mongoose";

interface IWorkshop {
    title: string;
    description: string;
    createAt: string;
    finishAt: string;
    enterprise: ObjectId;
    Admin: ObjectId;
    course: ObjectId;
}

export default IWorkshop;
