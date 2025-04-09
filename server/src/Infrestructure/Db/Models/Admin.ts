import { Schema, model } from "mongoose";
import IAdmin from "../../../Domain/Interfaces/Db Interfaces/IAdmin";

const AdminSchema = new Schema<IAdmin>({
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  enterprise: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Enterprise",
  },
  createAt: {
    type: String,
    default: new Date().toLocaleDateString("es-co"),
    required: true,
  },
});

const AdminModel = model<IAdmin>("Admin", AdminSchema);

export default AdminModel;
