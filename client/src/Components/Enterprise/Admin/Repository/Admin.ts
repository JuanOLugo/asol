import AdminController from "../Controllers/Admin";
import IAdmin from "../Interfaces/Admin";

class AdminRepository {
  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<Omit<IAdmin, "enterprise">>>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  public handleSubmit = async (e: React.FormEvent, formData: Omit<IAdmin, "enterprise">, SubmitType: "register" | "login") => {
    e.preventDefault();
    try {
        if(SubmitType === "register"){
            const response = await AdminController.CreateAdmin(formData)
            console.log(response)
        }else if(SubmitType === "login"){
            await AdminController.LoginAdmin(formData)
            window.location.href = "/admin"
        }
    } catch (error) {
        console.log(error)
    }
  };

  public togglePasswordVisibility = (
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
    showPassword: boolean
  ) => {
    setShowPassword(!showPassword);
  };


  
  
}

export default new AdminRepository();
