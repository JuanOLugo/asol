import jwt from "jsonwebtoken";
const secret = process.env.SECRET || "secret";
class AdminEntity {
  public verifyPassword(password: string): boolean {
    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
    return true;
  }

  public verifyName(name: string): boolean {
    if (name.length < 3) {
      throw new Error("El nombre debe tener al menos 3 caracteres");
    }
    return true;
  }

  public verifyEmail(email: string): boolean {
    if (!email.includes("@")) {
      throw new Error("El email debe tener un @");
    }
    return true;
  }

  public verifyCreateAt(createAt: string): boolean {
    if (createAt.length < 5) {
      throw new Error("La fecha de creación debe tener al menos 5 caracteres");
    }
    return true;
  }

  public async DeserializeAdminToken(token: string) {
    if (!token) throw new Error("No token provided");
    try {
      const adminObject = jwt.verify(token, secret);
      return (adminObject as {id: string}).id;
    } catch (error: any){
     throw new Error(error.message);
    }
  }
}

export default AdminEntity;
