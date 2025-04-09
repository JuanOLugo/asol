import { ObjectId } from "mongoose";

interface ITitle {
    name: string;
    description: string;
    createAt: string;
    Admin: ObjectId;
    enterprise: ObjectId;
}

export default ITitle;
