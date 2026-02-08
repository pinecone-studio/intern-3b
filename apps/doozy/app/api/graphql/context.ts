import { auth } from '@clerk/nextjs/server';

export const createContext = async () => {
  const { userId } = await auth();

  return { userId };
};

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>;
