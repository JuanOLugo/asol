import { Request, Response } from "express";
import UserRepository from "../../../Domain/Repositories/User";

class UserController {
  public async CreateUser(req: Request, res: Response):Promise<any> {
    const user = req.body;
    try {
        
      const userCreated = await new UserRepository().CreateUser(user);
      res.status(201).json(userCreated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async GetUserById(req: Request, res: Response): Promise<any>{
    const {id} = req.params;
    try {
      const user = await new UserRepository().GetUserById(id);
      return res.status(200).json(user);
    } catch (error:any) {
      return res.status(400).json({message: error.message});
    }
  }

  public async GetAllUsers(req: Request, res: Response): Promise<any>{
    try {
      const users = await new UserRepository().GetAllUsers(req.params.enterpriseId);
      return res.status(200).json(users);
    } catch (error:any) {
      return res.status(400).json({message: error.message});
    }
  }
}

export default UserController;
