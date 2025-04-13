import { Trainer } from "../Views/Capacitation";

class TrainerRepository {
  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, setFormData: React.Dispatch<React.SetStateAction<Omit<Trainer, "id" | "createAt">>>
  ) => {

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  public handleSubmit = (e: React.FormEvent, isEditing: boolean, trainer: Trainer | null, formData: Omit<Trainer, "id" | "createAt"> | null, onUpdate: (trainer: Trainer) => void, onAdd: (trainer: Omit<Trainer, "id" | "createAt">) => void) => {
    e.preventDefault();
    if(!formData) return;
    if (isEditing && trainer) {
      onUpdate({
        ...trainer,
        ...formData,
      });
    } else {
      onAdd(formData);
    }
  };
}

export default TrainerRepository;
