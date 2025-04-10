import { Request, Response } from "express";
import EnterpriseRepository from "../../../Domain/Repositories/Enterprise";

class EnterpriseController {
  public async RegisterEnterprise(req: Request, res: Response) {
    const enterpriseRepository = new EnterpriseRepository();
    try {
      const enterprise = await enterpriseRepository.RegisterEnterprise(
        req.body
      );
      res
        .status(201)
        .cookie("token", enterprise?.token)
        .send({ message: "Enterprise registered successfully" });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ message: error.message });
      
    }
  }

  public async GetEnterprise(req: Request, res: Response) {
    const enterpriseRepository = new EnterpriseRepository();
    const enterpriseId = (req.user as { _id: string })?._id;
    try {
      const enterprise = await enterpriseRepository.GetEnterprise(
        enterpriseId
      );
      res.status(200).send(enterprise);
    } catch (error: any) {

      res.status(400).send({ message: error.message });
    }
  }

  public async LoginEnterprise(req: Request, res: Response) {
    const enterpriseRepository = new EnterpriseRepository();
    try {
      const enterprise = await enterpriseRepository.LoginEnterprise(
        req.body.email,
        req.body.password
      );
      
      res
        .status(200)
        .cookie("token", enterprise?.token)
        .send({ msg: "Enterprise logged in successfully" });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  }

  public async UpdateEnterprise(req: Request, res: Response) {
    const enterpriseRepository = new EnterpriseRepository();
    try {
      const enterprise = await enterpriseRepository.UpdateEnterprise(
        req.params.id,
        req.body
      );
      res.status(200).send({ message: "Enterprise updated successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async DeleteEnterprise(req: Request, res: Response) {
    const enterpriseRepository = new EnterpriseRepository();
    const enterprise = await enterpriseRepository.DeleteEnterprise(
      req.params.id
    );
    res.status(200).send(enterprise);
  }
}

export default EnterpriseController;
