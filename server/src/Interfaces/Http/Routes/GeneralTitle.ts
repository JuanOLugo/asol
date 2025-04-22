import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import GeneralTitleController from "../Controllers/GeneralTitle";

const GeneralTitleRouter = Router();

GeneralTitleRouter.post("/create",passportConfig.authenticate("jwt",{session:false}), new GeneralTitleController().CreateTitle);
GeneralTitleRouter.get("/all/:enterpriseId",passportConfig.authenticate("jwt",{session:false}), new GeneralTitleController().GetAllTitles);
GeneralTitleRouter.post("/update",passportConfig.authenticate("jwt",{session:false}), new GeneralTitleController().UpdateTitle);
GeneralTitleRouter.delete("/delete/:titleId",passportConfig.authenticate("jwt",{session:false}), new GeneralTitleController().DeleteTitle);
GeneralTitleRouter.get("/:titleId",passportConfig.authenticate("jwt",{session:false}), new GeneralTitleController().GetTitleById);
export default GeneralTitleRouter;
