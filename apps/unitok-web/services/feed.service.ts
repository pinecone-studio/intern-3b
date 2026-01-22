import { prisma } from '../lib/prisma';

export function getFeed() {
  return prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      course: true,
      likes: { select: { id: true } },
    },
  });
}
