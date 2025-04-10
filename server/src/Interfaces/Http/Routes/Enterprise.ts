import { Router } from "express";
import EnterpriseController from "../Controllers/Enterprise";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
const EnterpriseRouter = Router();

EnterpriseRouter.post("/register", new EnterpriseController().RegisterEnterprise);
EnterpriseRouter.post("/login", new EnterpriseController().LoginEnterprise);
EnterpriseRouter.put("/update/:id", passportConfig.authenticate("jwt", { session: false }), new EnterpriseController().UpdateEnterprise);
EnterpriseRouter.delete("/delete/:id", passportConfig.authenticate("jwt", { session: false }), new EnterpriseController().DeleteEnterprise);
EnterpriseRouter.post("/get", passportConfig.authenticate("jwt", { session: false }), new EnterpriseController().GetEnterprise);

export default EnterpriseRouter;
