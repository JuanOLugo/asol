import { Schema, model } from "mongoose";
import ITitle from "../../../Domain/Interfaces/Db Interfaces/ITitle";

const TitleSchema = new Schema<ITitle>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enterprise: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Enterprise",
  },
  Admin: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  createAt: {
    type: String,
    default: new Date().toLocaleDateString("es-co"),
    required: true,
  },
});

const TitleModel = model<ITitle>("Title", TitleSchema);

export default TitleModel;
