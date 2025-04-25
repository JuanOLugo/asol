import mongoose, { ObjectId } from "mongoose";
import Answer from "./Answer";

interface IWorkshopQuestions {
    question: string;
    answers: mongoose.Types.ObjectId[];
    correctAnswer: mongoose.Types.ObjectId;
    workshop: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
}

export default IWorkshopQuestions;
