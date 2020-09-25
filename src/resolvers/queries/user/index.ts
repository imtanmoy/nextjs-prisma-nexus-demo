export const FindAllUsersResolver = async (root, args, ctx) => {
  return await ctx.prisma.user.findMany();
};

export const FindUserByIdResolver = async (root, { id }, ctx) =>
  await ctx.prisma.user.findOne({
    where: {
      id,
    },
  });
