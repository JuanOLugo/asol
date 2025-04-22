import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import CapacitationController from "../Controllers/Capacitation";

const CapacitationRouter = Router();

CapacitationRouter.post("/create",passportConfig.authenticate("jwt",{session:false}), new CapacitationController().CreateCapacitation);
CapacitationRouter.get("/all/:enterpriseId",passportConfig.authenticate("jwt",{session:false}), new CapacitationController().GetAllCapacitations);
CapacitationRouter.post("/update",passportConfig.authenticate("jwt",{session:false}), new CapacitationController().UpdateCapacitation);
CapacitationRouter.delete("/delete/:capacitationId",passportConfig.authenticate("jwt",{session:false}), new CapacitationController().DeleteCapacitation);
CapacitationRouter.get("/:capacitationId",passportConfig.authenticate("jwt",{session:false}), new CapacitationController().GetCapacitationById);
export default CapacitationRouter;
