import { Router } from "express";
import AdminController from "../Controllers/Admin";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";


const AdminRouter = Router();

AdminRouter.post("/register", passportConfig.authenticate("jwt", { session: false }), new AdminController().RegisterAdmin);
AdminRouter.post("/login", passportConfig.authenticate("jwt", { session: false }), new AdminController().LoginAdmin);
AdminRouter.get("/get/:id", passportConfig.authenticate("jwt", { session: false }), new AdminController().GetAdmin);
AdminRouter.post("/get-catalog", passportConfig.authenticate("jwt", { session: false }), new AdminController().GetCatalog);
export default AdminRouter;
