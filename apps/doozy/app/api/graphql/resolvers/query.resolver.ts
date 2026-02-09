import { GraphQLContext } from '../context';

export const queryResolvers = {
  health: async (
    _parent: unknown,
    _args: unknown,
    ctx: GraphQLContext,
  ): Promise<string> => {
    if (!ctx.userId) {
      return 'anonymous';
    }

    return 'authenticated';
  },
};
