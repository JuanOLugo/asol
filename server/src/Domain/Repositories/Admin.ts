import AdminModel from "../../Infrestructure/Db/Models/Admin";
import IAdmin from "../Interfaces/Db Interfaces/IAdmin";
import AdminEntity from "../Entities/Admin";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import CapacitationModel from "../../Infrestructure/Db/Models/Capacitation";
import CategoryModel from "../../Infrestructure/Db/Models/Category";
import TitleModel from "../../Infrestructure/Db/Models/Title";
import GeneralTitleModel from "../../Infrestructure/Db/Models/GeneralTitle";
class AdminRepository {
  public async RegisterAdmin(admin: IAdmin, enterpriseId: string) {
    const adminEntity = new AdminEntity();
    if (
      adminEntity.verifyPassword(admin.password) &&
      adminEntity.verifyEmail(admin.email)
    ) {
      const VerifyAdmin = await AdminModel.findOne({ dni: admin.dni, enterprise: enterpriseId});
      if (VerifyAdmin) {
        throw new Error("El administrador ya existe");
      }
      const adminModel = new AdminModel({
        ...admin,
        password: await bcrypt.hash(admin.password, 10),
        enterprise: enterpriseId,
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

  public async LoginAdmin(dni: string, password: string, enterpriseId: string) {
    const adminEntity = new AdminEntity();
    console.log(enterpriseId)
    if (adminEntity.verifyPassword(password)) {
      const admin = await AdminModel.findOne({ dni, enterprise: enterpriseId }).select("+password");
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

  public async GetAdmin(id: string, enterpriseId: string) {
    return await AdminModel.findOne({ _id: id, enterprise: enterpriseId });
  }

  public async GetCatalog(enterpriseId: string) {
    const catalog = await CapacitationModel.find({ enterprise: enterpriseId }).populate("category").populate("Admin");
    const categories = await CategoryModel.find({ enterprise: enterpriseId }).populate("Admin");
    const titles = await TitleModel.find({ enterprise: enterpriseId }).populate("Admin").populate("category");
    const generalTitles = await GeneralTitleModel.find({ enterprise: enterpriseId }).populate("Admin");
    return {
      catalog,
      categories,
      titles,
      generalTitles,
    };
  }
}

export default AdminRepository;
