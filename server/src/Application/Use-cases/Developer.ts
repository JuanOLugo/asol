import nodemailer from "nodemailer";
import ICode from "../../Domain/Interfaces/ServerInterfaces/ICode";
const codes: ICode[] = [];
class DeveloperUseCase {
  public async sendEmailCode(email: string) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "pisstreamer@gmail.com", //your email address
        pass: "xwrb pnzu dyjl kfbq", // or your App Password if using Gmail with 2FA
      },
      tls: {
        rejectUnauthorized: false, // should be set to true in production
      },
    });
    const usersEmail = [
      "juanandresojeda77@gmail.com",
      "juanandresojeda88@gmail.com",
    ];
    if (usersEmail.includes(email)) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      codes.push({
        email,
        code,
      });
      const mailOptions = {
        from: "Verificacion de entidad",
        to: email,
        subject: "Verificacion de entidad",
        html: `<p style="font-size: 20px; font-weight: bold;">Tu codigo de verificacion es: ${code}</p>`,
      };

      const info = await transporter.sendMail(mailOptions);

      return {
        message: "Email sent",
        code,
      };
    } else {
      throw new Error(
        "Error: el email no coincide con los de los desarrolladores"
      );
    }
  }

  public async verifyEmail(email: string, code: string) {
    if (codes.find((c) => c.code === code)) {
      codes.splice(codes.indexOf({ email, code }), 1);
      return { message: "Codigo verificado" };
    } else {
      throw new Error("Codigo incorrecto");
    }
  }
}

export default DeveloperUseCase;
