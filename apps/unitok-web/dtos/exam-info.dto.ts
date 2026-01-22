import { ExamType, DifficultyLevel, ExamFormat, Semester } from '../generated/prisma';

export interface CreateExamInfoDTO {
  courseId: string;
  semester: Semester;
  year: number;
  examType: ExamType;
  difficulty: DifficultyLevel;
  preparationTip?: string;
  recommendation?: string;
  formats: ExamFormat[];
  questions: string[];
}
