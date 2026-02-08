import { server } from './graphql';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createContext } from './graphql/context';

const handler = startServerAndCreateNextHandler(server, {
  context: async () => createContext(),
});

export { handler as GET, handler as POST };
