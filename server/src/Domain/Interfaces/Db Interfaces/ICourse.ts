import mongoose, { ObjectId } from "mongoose";

interface ICourse {
    name: string;
    description: string;
    createAt: string;
    enterprise: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
}

export default ICourse;
