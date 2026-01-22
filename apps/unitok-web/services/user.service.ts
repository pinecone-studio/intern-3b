import { prisma } from "../lib/prisma";


export function getMe(userId: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      university: true,
    },
  });
}
