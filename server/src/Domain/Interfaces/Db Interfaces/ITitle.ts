import mongoose, { ObjectId } from "mongoose";

interface ITitle {
    name: string;
    description: string;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
}

export default ITitle;
