import { prisma } from '../lib/prisma';

export async function searchCourses(q: string) {
  return prisma.course.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    include: { reviews: { select: { rating: true } } },
  });
}

export async function searchProfessors(q: string) {
  return prisma.professor.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    include: {
      courses: { include: { reviews: { select: { rating: true } } } },
    },
  });
}
