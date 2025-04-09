import { Schema, model } from "mongoose";
import IWorkshop from "../../../Domain/Interfaces/Db Interfaces/IWorkshop";

const WorkshopSchema = new Schema<IWorkshop>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createAt: { type: String, default: new Date().toLocaleDateString("es-co"), required: true },
  finishAt: { type: String, required: true, },
  enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
  Admin: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
  course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
});

const WorkshopModel = model<IWorkshop>("Workshop", WorkshopSchema);

export default WorkshopModel;
