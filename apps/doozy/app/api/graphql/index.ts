import { ApolloServer } from '@apollo/server';

export const server = new ApolloServer({
  typeDefs: `
    type Query {
      health: String
    }
  `,
  resolvers: {
    Query: {
      health: () => 'ok',
    },
  },
});
