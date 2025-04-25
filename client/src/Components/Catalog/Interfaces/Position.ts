import { GeneralTitle } from "./GeneralTitle";

export interface Position {
  _id: string;
  name: string;
  Admin: {
    name: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
}

export interface PositionSectionProps {
  cargosGenerales: GeneralTitle[];
  positions: Position[];
  onAdd: (name: string, id: string, adminName: string, adminLastName: string, categoryName: string, categoryId: string) => void;
  onUpdate: (id: string, name: string, categoryId: string) => void;
  onDelete: (id: string) => void;
}
