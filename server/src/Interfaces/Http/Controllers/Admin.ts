import { Request, Response } from "express";
import AdminRepository from "../../../Domain/Repositories/Admin";

class AdminController {
  public async RegisterAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    const enterpriseId = (req.user as { _id: string })?._id;
    try {
      const admin = await adminRepository.RegisterAdmin(req.body, enterpriseId);
      res
        .status(201)
        .send({ message: "Admin registered successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async GetCatalog(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    const enterpriseId = (req.user as { _id: string })?._id;
    try {
      const catalog = await adminRepository.GetCatalog(enterpriseId);
      res.status(200).send(catalog);
    }catch(error:any){
      res.status(400).send({message:error.message});
    }
  }

  public async GetAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    const enterpriseId = (req.user as { _id: string })?._id;
    try {
      const Admin = await adminRepository.GetAdmin(req.params.id, enterpriseId);
      res.status(200).send(Admin);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async LoginAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    const enterpriseId = (req.user as { _id: string })?._id;
    if (!enterpriseId) {
      res.status(400).send({ message: "Enterprise ID is required" });
      return;
    }
    try {
      const Admin = await adminRepository.LoginAdmin(
        req.body.dni,
        req.body.password,
        enterpriseId
      );

      res
        .status(200)
        .cookie("admin-token", Admin?.token)
        .send({ msg: "Admin logged in successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}

export default AdminController;
