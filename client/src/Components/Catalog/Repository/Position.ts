import { Position } from "../Interfaces/Position";

class PositionRepository {
  public handleSubmit = (
    e: React.FormEvent,
    onAdd: (name: string) => void,
    newPosition: string,
    setNewPosition: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    if (newPosition.trim()) {
      onAdd(newPosition.trim());
      setNewPosition("");
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
