import { prisma } from "../lib/prisma";


export async function getTicketHistory(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const logs = await prisma.ticketTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    balance: user.tickets,
    logs,
  };
}
