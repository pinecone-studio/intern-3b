import { auth } from '@clerk/nextjs/server';

export const createContext = async () => {
  const { userId } = await auth;
};
