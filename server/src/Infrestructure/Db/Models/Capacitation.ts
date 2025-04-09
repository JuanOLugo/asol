import { Schema, model } from "mongoose";
import ICapacitation from "../../../Domain/Interfaces/Db Interfaces/ICapacitation";

const CapacitationSchema = new Schema<ICapacitation>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Admin: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
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
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

const CapacitationModel = model<ICapacitation>(
  "Capacitation",
  CapacitationSchema
);

export default CapacitationModel;
