import { Schema, model } from "mongoose";
import IGeneralTitle from "../../../Domain/Interfaces/Db Interfaces/GeneralTitle";

const GeneralTitleSchema = new Schema<IGeneralTitle>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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

const GeneralTitleModel = model<IGeneralTitle>("GeneralTitle", GeneralTitleSchema);

export default GeneralTitleModel;
