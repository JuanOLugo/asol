export interface Category {
  _id: string;
  name: string;
  Admin: {
    name: string;
    lastName: string;
  };
}

export interface CategorySectionProps {
  categories: Category[];
  onAdd: (name: string, id: string, adminName: string, adminLastName: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}
