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


export async function getTopRatedCourses(limit = 5) {
  // 1. Get average rating per course from reviews
  const ratings = await prisma.review.groupBy({
    by: ['courseId'], // assuming your review model has courseId field
    _avg: {
      rating: true,
    },
    orderBy: {
      _avg: {
        rating: 'desc',
      },
    },
    take: limit,
  });

  // 2. Get course info with professors for the top rated courses
  const topCourses = await prisma.course.findMany({
    where: {
      id: {
        in: ratings.map((r) => r.courseId),
      },
    },
    include: {
      professor: true,
    },
  });

  // 3. Combine rating info with course info
  return topCourses.map((course) => {
    const rating =
      ratings.find((r) => r.courseId === course.id)?._avg.rating || 0;
    return {
      ...course,
      avgRating: rating,
    };
  });
}
