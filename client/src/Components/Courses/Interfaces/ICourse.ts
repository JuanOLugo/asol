import { Capacitation } from "../../Capacitation/Interface/Trainer";
import { Category } from "../../Catalog/Interfaces/Category";
import IAdmin from "../../Enterprise/Admin/Interfaces/Admin";

interface QuestionResponse {
  _id: string;
  question: string;
  answers: Answer[];
  correctAnswer: Answer;
  enterprise: string; 
  workshop: workshop;
  Admin: IAdmin;
  __v: number;
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  category: Category;
  capacityType: Capacitation;
  createAt: string;
  Admin: IAdmin;
  questions: QuestionResponse[]
}



export interface workshop {
  title: string;
  description: string;
  createAt: string;
  finishAt: string;
  Admin: IAdmin;
  course: Course;
}

export interface Answer {
  _id: string;
  name: string;
}

export interface IWorkshopQuestions {
  question: string;
  answers: Answer[];
  correctAnswer: Answer;
  workshop: workshop;
  Admin: IAdmin;
}

export interface CourseCardProps {
  course: Course;
  onDelete: () => void;
  onEdit: () => void;
}

export interface CourseSliderProps {
  courses: Course[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
