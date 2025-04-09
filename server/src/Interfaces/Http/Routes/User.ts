import { Router } from "express";
import passportConfig from "../../../Infrestructure/Auth/Passport.config";
import UserController from "../Controllers/User";

const UserRouter = Router();

UserRouter.post("/create", passportConfig.authenticate("jwt", { session: false }), new UserController().CreateUser);
UserRouter.get("/getuser/:id", passportConfig.authenticate("jwt", { session: false }), new UserController().GetUserById);
UserRouter.get("/getallusers/:enterpriseId", passportConfig.authenticate("jwt", { session: false }), new UserController().GetAllUsers);
export default UserRouter;
