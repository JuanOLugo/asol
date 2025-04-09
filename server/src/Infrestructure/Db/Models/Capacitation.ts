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
  createAt: {
    type: String,
    default: new Date().toLocaleDateString("es-co"),
    required: true,
  },
});

const CapacitationModel = model<ICapacitation>(
  "Capacitation",
  CapacitationSchema
);

export default CapacitationModel;
