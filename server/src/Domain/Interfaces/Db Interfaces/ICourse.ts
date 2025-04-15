import mongoose, { ObjectId } from "mongoose";

interface ICourse {
    name: string;
    description: string;
    createAt: string;
    capacityType: [string];
    enterprise: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    title: mongoose.Types.ObjectId;
}

export default ICourse;
