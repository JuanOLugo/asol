import { Training } from "../Interfaces/CatalogList";
import Cookies from "js-cookie";
class CatalogListRepository {
  public handleSubmit = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIndividualCategory: React.Dispatch<React.SetStateAction<string>>,
    onAdd: (name: string, categoryId: string) => void,
    setNewTraining: React.Dispatch<React.SetStateAction<string>>,
    newTraining: string,
    IndividualCategory: string
  ) => {
    if (newTraining.trim()) {
      const data = {
        name: newTraining.trim(),
        description: "",
        categoryId: IndividualCategory || "",
        adminId: Cookies.get("admin-token") || "",
        createdAt: new Date().toLocaleDateString("es-CO"),
      };
      console.log(data);
      onAdd(newTraining.trim(), IndividualCategory || "");
      setOpenModal(false);
      setIndividualCategory("");
      setNewTraining("");
    }
  };

  public startEditing = (
    training: Training,
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(training.id);
    setEditingName(training.name);
  };

  public cancelEditing = (
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(null);
    setEditingName("");
  };

  public saveEditing = (
    onUpdate: (id: number, name: string) => void,
    editingId: number,
    editingName: string,
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim());
      setEditingId(null);
      setEditingName("");
    }
  };
}

export default CatalogListRepository;
