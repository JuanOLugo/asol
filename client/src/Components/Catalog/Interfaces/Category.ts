export interface Category {
  id: string;
  name: string;
}

export interface CategorySectionProps {
  categories: Category[];
  onAdd: (name: string, id: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}
