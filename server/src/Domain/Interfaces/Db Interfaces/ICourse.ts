import { ObjectId } from "mongoose";

interface ICourse {
    name: string;
    description: string;
    createAt: string;
    enterprise: ObjectId;
    Admin: ObjectId;
}

export default ICourse;
