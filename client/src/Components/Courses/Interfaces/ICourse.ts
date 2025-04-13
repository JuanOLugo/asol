export interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  questionCount: number;
}
export interface CourseCardProps {
  course: Course;
  onDelete: () => void;
  onEdit: () => void;
}

export interface CourseSliderProps {
  courses: Course[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
