
import { Prisma } from "../generated/prisma";
import { Errors } from "../lib/errors";
import { prisma } from "../lib/prisma";

export function getExamInfoPreviews(courseId: string) {
  return prisma.examInfo.findMany({
    where: { courseId },
    select: {
      id: true,
      examType: true,
      difficulty: true,
      costTickets: true,
      likes: { select: { id: true } },
      createdAt: true,
    },
  });
}

export async function viewExamInfo(
  userId: string,
  examInfoId: string
) {
  return prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const examInfo = await tx.examInfo.findUniqueOrThrow({
        where: { id: examInfoId },
      });

      const user = await tx.user.findUniqueOrThrow({
        where: { id: userId },
      });

      if (user.tickets < examInfo.costTickets) {
        throw Errors.INSUFFICIENT_TICKETS;
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          tickets: { decrement: examInfo.costTickets },
        },
      });

      await tx.ticketTransaction.create({
        data: {
          userId,
          amount: -examInfo.costTickets,
          action: "EXAM_INFO_VIEWED",
          examInfoId,
        },
      });

      return tx.examInfo.findUnique({
        where: { id: examInfoId },
        include: {
          formats: true,
          questions: true,
          likes: true,
        },
      });
    }
  );
}
