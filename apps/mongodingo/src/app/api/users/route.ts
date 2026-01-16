import { prisma } from '@/lib/prisma';

export const GET = async () => {
  const users = await prisma.user.findMany();
  return Response.json({ users }, { status: 200 });
};
