// src/lib/majors-learning-data.ts

export interface Question {
  id: number;
  question: string;
  questionMn: string;
  code?: string;
  answers: string[];
  answersMn: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleMn: string;
  description: string;
  descriptionMn: string;
  xp: number;
  questions: Question[];
}

export interface Course {
  id: string;
  title: string;
  titleMn: string;
  subtitle: string;
  subtitleMn: string;
  icon: string;
  estimatedMinutes: number;
  xpReward: number;
  lessons: Lesson[];
}

export interface Major {
  id: string;
  title: string;
  titleMn: string;
  description: string;
  descriptionMn: string;
  courses: Course[];
}
