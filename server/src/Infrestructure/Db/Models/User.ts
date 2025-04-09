import { Schema, model } from "mongoose";
import IUser from "../../../Domain/Interfaces/Db Interfaces/IUser";

const UserSchema = new Schema<IUser>({
  dni: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
  email: { type: String, required: true },
  title: { type: Schema.Types.ObjectId, required: true, ref: "Title" },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  capacitation: { type: Schema.Types.ObjectId, required: true, ref: "Capacitation" },
  createAt: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString("es-co"),
  },
  Admin: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
  course: { type: [Schema.Types.ObjectId], required: true, ref: "Course" },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
