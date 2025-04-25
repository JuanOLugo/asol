import { Category } from "./Category";

export interface Training {
  _id: string;
  name: string;
  categoryId?: string;
  categoryName?: string;
  category?: Category;
}

export interface TrainingSectionProps {
  trainings: Training[];
  categories: Category[];
  onAdd: (name: string, categoryId: string, id: string) => void;
  onUpdate: (id: string, name: string, categoryId: string) => void;
  onDelete: (id: string) => void;
}

