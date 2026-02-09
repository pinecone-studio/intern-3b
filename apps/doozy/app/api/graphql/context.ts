import { auth } from '@clerk/nextjs/server';
import { prisma } from '../db/prisma';

export async function createContext() {
  const { userId } = await auth();

  return {
    userId,
    prisma,
  };
}

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>;
