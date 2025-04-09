import AdminModel from "../../Infrestructure/Db/Models/Admin";
import IAdmin from "../Interfaces/Db Interfaces/IAdmin";
import AdminEntity from "../Entities/Admin";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

class AdminRepository {
  public async RegisterAdmin(admin: IAdmin) {
    const adminEntity = new AdminEntity();
    if (
      adminEntity.verifyPassword(admin.password) &&
      adminEntity.verifyEmail(admin.email)
    ) {
      const VerifyAdmin = await AdminModel.findOne({ dni: admin.dni});
      if (VerifyAdmin) {
        throw new Error("El administrador ya existe");
      }
      const adminModel = new AdminModel({
        ...admin,
        password: await bcrypt.hash(admin.password, 10),
      });
      const adminSaved = await adminModel.save();
      return {
        admin: adminSaved,
        token: jsonwebtoken.sign(
          { id: adminModel._id },
          process.env.JWT_SECRET || "secret"
        ),
      };
    }
  }

  public async LoginAdmin(dni: string, password: string) {
    const adminEntity = new AdminEntity();
    if (adminEntity.verifyPassword(password)) {
      const admin = await AdminModel.findOne({ dni }).select("+password");
      if (!admin) {
        throw new Error("No se encontró el administrador");
      }
      if (!(await bcrypt.compare(password, admin.password))) {
        throw new Error("Contraseña incorrecta");
      }
      return {
        ...admin,
        password: null,
        token: jsonwebtoken.sign(
          { id: admin._id },
          process.env.JWT_SECRET || "secret"
        ),
      };
    }
  }

  public async UpdateAdmin(id: string, admin: IAdmin) {
    const adminEntity = new AdminEntity();
    if (
      adminEntity.verifyPassword(admin.password) &&
      adminEntity.verifyEmail(admin.email)
    ) {
      return await AdminModel.findByIdAndUpdate(id, admin, { new: true });
    }
  }

  public async DeleteAdmin(id: string) {
    return await AdminModel.findByIdAndDelete(id);
  }

  public async GetAdmin(id: string) {
    return await AdminModel.findById(id);
  }
}

export default AdminRepository;
