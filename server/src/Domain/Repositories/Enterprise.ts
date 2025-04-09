import EnterpriseModel from "../../Infrestructure/Db/Models/Enterprise";
import IEnterprise from "../Interfaces/Db Interfaces/IEnterprise";
import EnterpriseEntity from "../Entities/Enterprise";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
class EnterpriseRepository {
  public async RegisterEnterprise(enterprise: IEnterprise) {
    const enterpriseEntity = new EnterpriseEntity();

    if (
      enterpriseEntity.verifyPassword(enterprise.password) &&
      enterpriseEntity.verifyEmail(enterprise.email)
    ) {
      const findEnterprise = await EnterpriseModel.findOne({
        email: enterprise.email,
      });
      if (findEnterprise) {
        throw new Error("Enterprise already exists");
      } else {
        const enterpriseModel = new EnterpriseModel({
          ...enterprise,
          password: await bcrypt.hash(enterprise.password, 10),
        });
        return {
          enterprise: await enterpriseModel.save(),
          token: jsonwebtoken.sign(
            { id: enterpriseModel._id },
            process.env.JWT_SECRET || "secret"
          ),
        };
      }
    }
  }

  public async GetEnterprise(id: string) {
    const enterprise = await EnterpriseModel.findById(id);
    if (!enterprise) {
      throw new Error("No se encontró la empresa");
    }
    return enterprise;
  }

  public async LoginEnterprise(email: string, password: string) {
    const enterpriseEntity = new EnterpriseEntity();
    if (
      enterpriseEntity.verifyEmail(email) &&
      enterpriseEntity.verifyPassword(password)
    ) {
      const enterprise = await EnterpriseModel.findOne({ email }).select(
        "+password"
      );
      if (!enterprise) {
        throw new Error("No se encontró la empresa");
      }
      if (!(await bcrypt.compare(password, enterprise.password))) {
        throw new Error("Contraseña incorrecta");
      }
      return {
        ...enterprise,
        password: null,
        token: jsonwebtoken.sign(
          { id: enterprise._id },
          process.env.JWT_SECRET || "secret"
        ),
      };
    }
  }

  public async DeleteEnterprise(id: string) {
    return await EnterpriseModel.findByIdAndDelete(id);
  }

  public async UpdateEnterprise(id: string, enterprise: IEnterprise) {
    return await EnterpriseModel.findByIdAndUpdate(id, enterprise);
  }
}

export default EnterpriseRepository;
