import DeveloperUseCase from "../../../Application/Use-cases/Developer";
import { Request, Response } from "express";
const developerUseCase = new DeveloperUseCase();
class DeveloperController {
  public async sendEmailCode(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const result = await developerUseCase.sendEmailCode(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  public async verifyEmail(req: Request, res: Response) {
    const { email, code } = req.body;
    try {
      const result = await developerUseCase.verifyEmail(email, code);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default DeveloperController;
