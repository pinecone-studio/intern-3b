import { CreateReviewDTO } from '../dtos/review.dto';
import { prisma } from '../lib/prisma';

export function getReviews(courseId: string) {
  return prisma.review.findMany({
    where: { courseId },
    orderBy: { createdAt: 'desc' },
    include: { likes: true },
  });
}

export function createReview(userId: string, dto: CreateReviewDTO) {
  return prisma.$transaction([
    prisma.review.create({ data: { ...dto, userId } }),
    prisma.user.update({
      where: { id: userId },
      data: { tickets: { increment: 10 } },
    }),
    prisma.ticketTransaction.create({
      data: { userId, amount: 10, action: 'REVIEW_CREATED' },
    }),
  ]);
}
