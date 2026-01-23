import { LikeDTO } from "../dtos/like.dto";
import { TICKET_REWARDS } from "../lib/constants";
import { prisma } from "../lib/prisma";



export function likeContent(
  userId: string,
  dto: LikeDTO
) {
  return prisma.$transaction([
    prisma.like.create({
      data: {
        ...dto,
        userId,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        tickets: { increment: TICKET_REWARDS.LIKE_CREATED },
      },
    }),
    prisma.ticketTransaction.create({
      data: {
        userId,
        amount: TICKET_REWARDS.LIKE_CREATED,
        action: dto.reviewId
          ? "REVIEW_LIKED"
          : "EXAM_INFO_LIKED",
      },
    }),
  ]);
}
