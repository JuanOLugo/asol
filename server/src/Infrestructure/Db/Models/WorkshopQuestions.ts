import { Schema, model } from "mongoose";
import IWorkshopQuestions from "../../../Domain/Interfaces/Db Interfaces/IWorkshopQuestions";

const WorkshopQuestionsSchema = new Schema<IWorkshopQuestions>({
    question: { type: String, required: true },
    answers: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    workshop: { type: Schema.Types.ObjectId, required: true, ref: "Workshop" },
    Admin: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
    enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
    User: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const WorkshopQuestionsModel = model<IWorkshopQuestions>("WorkshopQuestions", WorkshopQuestionsSchema);

export default WorkshopQuestionsModel;
