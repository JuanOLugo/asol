import { Category } from "./Category";

export interface Training {
  id: number;
  name: string;
  categoryId?: string;
  categoryName?: string;
}

export interface TrainingSectionProps {
  trainings: Training[];
  categories: Category[];
  onAdd: (name: string, categoryId: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

