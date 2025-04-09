import { Schema, model } from "mongoose";
import ICategory from "../../../Domain/Interfaces/Db Interfaces/ICategory";

const CategorySchema = new Schema<ICategory>({
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

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;
