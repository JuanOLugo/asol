import CapacitationControllers from "../Controllers/Capacitation";
import { Training } from "../Interfaces/CatalogList";
import Cookies from "js-cookie";
class CatalogListRepository {
  public handleSubmit = async (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setIndividualCategory: React.Dispatch<React.SetStateAction<string>>,
    onAdd: (name: string, categoryId: string, id: string) => void,
    setNewTraining: React.Dispatch<React.SetStateAction<string>>,
    newTraining: string,
    IndividualCategory: string
  ) => {
    if (newTraining.trim()) {
      const data = {
        name: newTraining.trim(),
        description: "",
        createdAt: new Date().toLocaleDateString("es-CO"),
        adminId: Cookies.get("admin-token") || "",
        categoryId: IndividualCategory || "",
      };
      try {
        const response = await new CapacitationControllers().CreateCapacitation(
          data
        );
        onAdd(newTraining.trim(), IndividualCategory || "", response._id);
        setOpenModal(false);
        setIndividualCategory("");
        setNewTraining("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  public startEditing = (
    training: Training,
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setEditingId(training._id);
    setEditingName(training.name);
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
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditingName: React.Dispatch<React.SetStateAction<string>>,
    IndividualCategory: string
  ) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim(), IndividualCategory);
      setEditingId(null);
      setEditingName("");
    }
  };
}

export default CatalogListRepository;
