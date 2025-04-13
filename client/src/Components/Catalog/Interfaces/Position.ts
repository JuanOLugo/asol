export interface Position {
  id: number;
  name: string;
}

export interface PositionSectionProps {
  positions: Position[];
  onAdd: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}
