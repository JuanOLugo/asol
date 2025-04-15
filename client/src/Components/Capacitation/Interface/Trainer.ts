import { Trainer } from "../Views/Capacitation";

export interface TrainerCardProps {
  trainer: Trainer;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: number) => void;
}

export interface TrainersListProps {
  trainers: Trainer[];
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: number) => void;
}

export interface Capacitation {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface TrainerFormProps {
  trainer: Trainer | null;
  isEditing: boolean;
  onAdd: (trainer: Omit<Trainer, "id" | "createAt">) => void;
  onUpdate: (trainer: Trainer) => void;
  onCancel: () => void;
}
