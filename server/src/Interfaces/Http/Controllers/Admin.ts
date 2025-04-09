import { Request, Response } from "express";
import AdminRepository from "../../../Domain/Repositories/Admin";

class AdminController {
  public async RegisterAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    try {
      const admin = await adminRepository.RegisterAdmin(
        req.body
      );
      res
        .status(201)
        .cookie("token", admin?.token)
        .send({ message: "Admin registered successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async GetAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    try {
      const Admin = await adminRepository.GetAdmin(
        req.params.id
      );
      res.status(200).send(Admin);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public async LoginAdmin(req: Request, res: Response) {
    const adminRepository = new AdminRepository();
    try {
      const Admin = await adminRepository.LoginAdmin(
        req.body.dni,
        req.body.password
      );

      res
        .status(200)
        .cookie("token", Admin?.token)
        .send({ msg: "Admin logged in successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}

export default AdminController;
