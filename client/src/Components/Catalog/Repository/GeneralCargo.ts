import GeneralTitleController from "../Controllers/GeneralCargos";
import Cookies from "js-cookie";
import { GeneralTitle } from "../Interfaces/GeneralTitle";
const generalTitleController = new GeneralTitleController();

class GeneralTitleRepository {
  public handleSubmit = async (
    e: React.FormEvent,
    onAdd: (name: string, id: string, adminName: string, adminLastName: string) => void,
    newGeneralTitle: string,
    setNewGeneralTitle: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    if (newGeneralTitle.trim()) {
      
      const data = {
        name: newGeneralTitle.trim(),
        description: "",
        adminId: Cookies.get("admin-token") || "",
        createdAt: new Date().toLocaleDateString("es-CO"),
      };
      try {
        const response = await generalTitleController.CreateTitle(data);
        onAdd(newGeneralTitle.trim(), response._id, response.Admin.name, response.Admin.lastName);
        setNewGeneralTitle("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  public startEditing = (
    generalTitle: GeneralTitle,
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(generalTitle._id);
    setEditingName(generalTitle.name);
  };

  public cancelEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(null);
    setEditingName("");
  };

  public saveEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>,
    onUpdate: (id: string, name: string) => void,
    editingId: string,
    editingName: string
  ) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim());
      setEditingId(null);
      setEditingName("");
    }
  };
}

export default GeneralTitleRepository;
