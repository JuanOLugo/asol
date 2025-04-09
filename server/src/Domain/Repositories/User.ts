import UserModel from "../../Infrestructure/Db/Models/User";
import IUser from "../Interfaces/Db Interfaces/IUser";
import bcrypt from "bcryptjs";
class UserRepository {
  public async CreateUser(user: IUser): Promise<IUser> {
    const findUser = await UserModel.findOne({ dni: user.dni });
    if (findUser) throw new Error("Usuario ya existe");
    const userCreating = await UserModel.create({
      ...user,
      pasword: await bcrypt.hash(user.password, 10),
    });
    const userCreated = await userCreating.save();
    return userCreated;
  }

  public async GetUserById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  public async GetAllUsers(enterpriseId: string): Promise<IUser[]> {
    const users = await UserModel.find({ enterprise: enterpriseId });
    if (!users) throw new Error("No hay usuarios");
    return users;
  }
}

export default UserRepository;
