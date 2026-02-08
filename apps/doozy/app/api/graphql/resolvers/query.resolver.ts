export const queryResolvers = {
  health: (
    _parent: unknown,
    _args: unknown,
    ctx: { userId: string | null },
  ) => {
    return ctx.userId ? 'authenticated' : 'anonymous';
  },
};
