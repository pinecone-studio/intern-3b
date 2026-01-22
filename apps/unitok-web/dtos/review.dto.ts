import {
  Semester,
  WorkloadLevel,
  DifficultyLevel,
  TeamWorkLevel,
  AttendanceType,
  ExamCount,
} from '../generated/prisma';

export interface CreateReviewDTO {
  courseId: string;
  rating: number;
  comment?: string;
  semester: Semester;
  year: number;
  workload: WorkloadLevel;
  difficulty: DifficultyLevel;
  teamWork: TeamWorkLevel;
  attendance: AttendanceType;
  examCount: ExamCount;
}
