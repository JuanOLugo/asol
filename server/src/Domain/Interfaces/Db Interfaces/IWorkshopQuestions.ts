import { ObjectId } from "mongoose";

interface IWorkshopQuestions {
    question: string;
    answers: string[];
    correctAnswer: string;
    workshop: ObjectId;
    Admin: ObjectId;
    enterprise: ObjectId;
    User: ObjectId;
}

export default IWorkshopQuestions;
