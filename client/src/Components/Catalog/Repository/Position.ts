import { Position } from "../Interfaces/Position";
import TitleController from "../Controllers/Title";
import Cookies from "js-cookie";
const titleController = new TitleController();

class PositionRepository {
  public handleSubmit = async (
    e: React.FormEvent,
    onAdd: (name: string) => void,
    newPosition: string,
    setNewPosition: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    if (newPosition.trim()) {
      
      console.log(newPosition.trim());
      const data = {
        name: newPosition.trim(),
        description: "",
        adminId: Cookies.get("admin-token") || "",
        createdAt: new Date().toLocaleDateString("es-CO"),
      };
      try {
        const response = await titleController.CreateTitle(data);
        console.log(response);
        onAdd(newPosition.trim());
        setNewPosition("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  public startEditing = (
    position: Position,
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(position.id);
    setEditingName(position.name);
  };

  public cancelEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(null);
    setEditingName("");
  };

  public saveEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>,
    onUpdate: (id: number, name: string) => void,
    editingId: number,
    editingName: string
  ) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim());
      setEditingId(null);
      setEditingName("");
    }
  };
}

export default PositionRepository;
