import mongoose, { ObjectId } from "mongoose";

interface IWorkshopQuestions {
    question: string;
    answers: string[];
    correctAnswer: string;
    workshop: mongoose.Types.ObjectId;
    Admin: mongoose.Types.ObjectId;
    enterprise: mongoose.Types.ObjectId;
    User: mongoose.Types.ObjectId;
}

export default IWorkshopQuestions;
