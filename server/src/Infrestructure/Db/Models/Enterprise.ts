import { Schema, model } from "mongoose";
import IEnterprise from "../../../Domain/Interfaces/Db Interfaces/IEnterprise";

const EnterpriseSchema = new Schema<IEnterprise>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createAt: {
    type: String,
    default: new Date().toLocaleDateString("es-co"),
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const EnterpriseModel = model<IEnterprise>("Enterprise", EnterpriseSchema);

export default EnterpriseModel;
