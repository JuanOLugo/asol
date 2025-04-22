import mongoose, { ObjectId } from "mongoose";

interface IGeneralTitle {
    name: string;
    description: string;
    createAt: string;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
}

export default IGeneralTitle;
