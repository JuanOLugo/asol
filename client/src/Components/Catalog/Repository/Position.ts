import { Position } from "../Interfaces/Position";
import TitleController from "../Controllers/Title";
import Cookies from "js-cookie";
const titleController = new TitleController();

class PositionRepository {
  public handleSubmit = async (
    onAdd: (name: string, id: string, adminName: string, adminLastName: string, categoryName: string, categoryId: string) => void,
    newPosition: string,
    setNewPosition: React.Dispatch<React.SetStateAction<string>>,
    cargoGeneralId: string
  ) => {
    if (newPosition.trim()) {
      const data = {
        name: newPosition.trim(),
        description: "",
        adminId: Cookies.get("admin-token") || "",
        createdAt: new Date().toLocaleDateString("es-CO"),
        cargoGeneralId: cargoGeneralId,
      };
      try {
        const response = await titleController.CreateTitle(data);
        onAdd(newPosition.trim(), response._id, response.Admin.name, response.Admin.lastName, response.category.name, response.category._id);
        setNewPosition("");

      } catch (error) {
        console.log(error);
      }
    }
  };

  public startEditing = (
    position: Position,
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(position._id);
    setEditingName(position.name);
  };

  public cancelEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(null);
    setEditingName("");
  };

  public saveEditing = (
    onUpdate: (id: string, name: string, categoryId: string) => void,
    editingId: string,
    editingName: string,
    categoryId: string
  ) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim(), categoryId);
    }
  };
}

export default PositionRepository;
