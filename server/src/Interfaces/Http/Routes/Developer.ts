import { Router } from "express";
import DeveloperController from "../Controllers/Developer";
const developerController = new DeveloperController();
const DeveloperRouter = Router();

DeveloperRouter.post("/get-entity", developerController.sendEmailCode);
DeveloperRouter.post("/verify-entity", developerController.verifyEmail);

export default DeveloperRouter;
