import React from "react";
import IEnterprise from "../Interfaces/IEnterprise";
import { AuthController } from "../Controllers/Auth";
import Cookies from "js-cookie";
import AuthEntities from "../Entities/Auth";
const authController = new AuthController();
const { SetTokenAndReload } = AuthEntities;
export class AuthFormRepository {
  public handleSubmit = async (
    e: React.FormEvent,
    activeTab: "login" | "register",
    formData: IEnterprise
  ) => {
    e.preventDefault();
    if (activeTab === "register") {
      try {
        await authController.Register(formData);
        const token = Cookies.get("token");
        SetTokenAndReload(token ?? "");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await authController.Login(formData);
        const token = Cookies.get("token");
        SetTokenAndReload(token ?? "");
      } catch (error) {
        console.log(error);
      }
    }
  };

  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<IEnterprise>>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: IEnterprise) => ({ ...prev, [name]: value }));
  };

  public togglePasswordVisibility = (
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
    showPassword: boolean
  ) => {
    setShowPassword(!showPassword);
  };
}
