import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import CategoryController from "../Controllers/Category";

const CategoryRouter = Router();

CategoryRouter.post("/create",passportConfig.authenticate("jwt",{session:false}), new CategoryController().CreateCategory);
CategoryRouter.get("/all/:enterpriseId",passportConfig.authenticate("jwt",{session:false}), new CategoryController().GetAllCategories);
CategoryRouter.post("/update",passportConfig.authenticate("jwt",{session:false}), new CategoryController().UpdateCategory);
CategoryRouter.delete("/delete/:categoryId",passportConfig.authenticate("jwt",{session:false}), new CategoryController().DeleteCategory);
CategoryRouter.get("/:categoryId",passportConfig.authenticate("jwt",{session:false}), new CategoryController().GetCategoryById);
export default CategoryRouter;
