import { Schema, model } from "mongoose";
import IWorkshopQuestions from "../../../Domain/Interfaces/Db Interfaces/IWorkshopQuestions";

const WorkshopQuestionsSchema = new Schema<IWorkshopQuestions>({
    question: { type: String, required: true },
    answers: { type: [Schema.Types.ObjectId], required: true, ref: "Answer"},
    correctAnswer: { type: Schema.Types.ObjectId, required: true, ref: "Answer" },
    workshop: { type: Schema.Types.ObjectId, required: true, ref: "Workshop" },
    Admin: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
    enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
});

const WorkshopQuestionsModel = model<IWorkshopQuestions>("WorkshopQuestions", WorkshopQuestionsSchema);

export default WorkshopQuestionsModel;
