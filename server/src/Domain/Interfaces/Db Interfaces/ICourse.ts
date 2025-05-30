import mongoose, { ObjectId } from "mongoose";

interface ICourse {
    name: string;
    description: string;
    createAt: string;
    capacityType: mongoose.Types.ObjectId[];
    enterprise: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    title: string;
}

export default ICourse;
