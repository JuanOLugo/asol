import { Schema, model } from "mongoose";
import ICourse from "../../../Domain/Interfaces/Db Interfaces/ICourse";

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createAt: { type: String, default: new Date().toLocaleDateString("es-co"), required: true },
  enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
  Admin: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  title: { type: Schema.Types.ObjectId, required: true, ref: "Title" },
});

const CourseModel = model<ICourse>("Course", CourseSchema);

export default CourseModel;
