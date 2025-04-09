import { Schema, model } from "mongoose";
import IUser from "../../../Domain/Interfaces/Db Interfaces/IUser";

const UserSchema = new Schema<IUser>({
  dni: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  enterprise: { type: Schema.Types.ObjectId, required: true, ref: "Enterprise" },
  title: { type: String, required: true, ref: "Title" },
  category: { type: String, required: true, ref: "Category" },
  capacitation: { type: String, required: true, ref: "Capacitation" },
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
