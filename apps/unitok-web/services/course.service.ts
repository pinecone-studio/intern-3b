import { prisma } from '../lib/prisma';

export async function getCourseDetail(courseId: string) {
  const reviews = await prisma.review.findMany({ where: { courseId } });

  return {
    course: await prisma.course.findUnique({
      where: { id: courseId },
      include: { professor: true },
    }),
    stats: {
      avgRating:
        reviews.reduce((a, r) => a + r.rating, 0) / reviews.length || 0,
      count: reviews.length,
    },
  };
}
