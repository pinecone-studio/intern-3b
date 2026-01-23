export type Course = {
  id: number;
  name: string;
  professor: string;
  rating: number;
  reviews: number | never[];
  semester: string;
};

export type Review = {
  id: number;
  courseId: number;
  rating: number;
  semester: string;
  text: string;
  likes: number;
  assignment: string;
  groupWork: string;
  grading: string;
  attendance: string;
  examCount: string;
};

export type TicketHistoryItem = {
  id: number;
  amount: number;
  reason: string;
  timestamp: Date;
};
