export interface Category {
  id: number;
  name: string;
}

export interface CategorySectionProps {
  categories: Category[];
  onAdd: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}
