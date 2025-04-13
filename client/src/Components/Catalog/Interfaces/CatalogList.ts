export interface Training {
  id: number;
  name: string;
}

export interface TrainingSectionProps {
  trainings: Training[];
  onAdd: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

