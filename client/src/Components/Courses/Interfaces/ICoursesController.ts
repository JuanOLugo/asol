import { Question } from "../Components/CourseForm";

export interface ICourseData {
  name: string;
  description?: string;
  title: string;
  createAt: string;
  capacityType: String[];
  category: String[];
  question: Question[];
  files: File[];
}
