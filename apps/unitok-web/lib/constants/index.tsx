import { Course, Review, TicketHistoryItem } from '@/lib/types';


export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Өгөгдлийн бүтэц',
    professor: 'Б.Болд',
    rating: 4.8,
    reviewCount: 127,
    semester: '2025-1',
  },
  {
    id: 2,
    name: 'Веб програмчлал',
    professor: 'Д.Дорж',
    rating: 4.5,
    reviewCount: 89,
    semester: '2025-1',
  },
  {
    id: 3,
    name: 'Мэдээллийн систем',
    professor: 'С.Сарнай',
    rating: 4.2,
    reviewCount: 64,
    semester: '2024-2',
  },
];

export const mockReviews: Review[] = [
  {
    id: 1,
    courseId: 1,
    rating: 5,
    semester: '2025-1 хичээл',
    text: 'Маш сайн багш байсан. Тайлбар тодорхой, шалгалт хүндэвтэр.',
    likes: 24,
    assignment: 'Заримдаа',
    groupWork: 'Амархан',
    grading: 'Дунд',
    attendance: 'Нэр дуудна',
    examCount: '2 удаа',
  },
  {
    id: 2,
    courseId: 1,
    rating: 4,
    semester: '2024-2 хичээл',
    text: 'Хичээл хурдтай явагддаг. Анхаарал хандуулбал амар.',
    likes: 18,
    assignment: 'Их',
    groupWork: 'Дунд',
    grading: 'Амархан',
    attendance: 'Сайтаар',
    examCount: '3 удаа',
  },
];

export const mockTicketHistory: TicketHistoryItem[] = [
  {
    id: 1,
    amount: 10,
    reason: 'Үнэлгээ бичсэн',
    timestamp: new Date('2025-01-14T10:30:00'),
  },
  {
    id: 2,
    amount: -5,
    reason: 'Шалгалтын мэдээлэл үзсэн',
    timestamp: new Date('2025-01-13T15:20:00'),
  },
  {
    id: 3,
    amount: 1,
    reason: 'Шалгалтын мэдээлэл үнэлсэн',
    timestamp: new Date('2025-01-13T15:25:00'),
  },
  {
    id: 4,
    amount: 10,
    reason: 'Үнэлгээ бичсэн',
    timestamp: new Date('2025-01-12T09:15:00'),
  },
  {
    id: 5,
    amount: -5,
    reason: 'Шалгалтын мэдээлэл үзсэн',
    timestamp: new Date('2025-01-11T14:40:00'),
  },
  {
    id: 6,
    amount: 10,
    reason: 'Үнэлгээ бичсэн',
    timestamp: new Date('2025-01-10T11:20:00'),
  },
  {
    id: 7,
    amount: 1,
    reason: 'Шалгалтын мэдээлэл үнэлсэн',
    timestamp: new Date('2025-01-10T11:22:00'),
  },
  {
    id: 8,
    amount: 10,
    reason: 'Үнэлгээ бичсэн',
    timestamp: new Date('2025-01-09T16:30:00'),
  },
];

