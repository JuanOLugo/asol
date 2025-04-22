import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import TitleController from "../Controllers/Title";

const TitleRouter = Router();

TitleRouter.post("/create",passportConfig.authenticate("jwt",{session:false}), new TitleController().CreateTitle);
TitleRouter.get("/all/:enterpriseId",passportConfig.authenticate("jwt",{session:false}), new TitleController().GetAllTitles);
TitleRouter.post("/update",passportConfig.authenticate("jwt",{session:false}), new TitleController().UpdateTitle);
TitleRouter.delete("/delete/:titleId",passportConfig.authenticate("jwt",{session:false}), new TitleController().DeleteTitle);
TitleRouter.get("/:titleId",passportConfig.authenticate("jwt",{session:false}), new TitleController().GetTitleById);
export default TitleRouter;
