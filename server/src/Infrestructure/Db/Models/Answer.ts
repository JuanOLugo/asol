import { Schema, model } from "mongoose";
import Answer from "../../../Domain/Interfaces/Db Interfaces/Answer";

const AnswerSchema = new Schema<Answer>({
  name: String
});

const AnswerModel = model<Answer>("Answer", AnswerSchema);

export default AnswerModel;
