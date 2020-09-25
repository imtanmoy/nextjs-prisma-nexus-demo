export const GetMeResolver = async (root, args, ctx) => {
  return await ctx.prisma.user.findOne({
    where: {
      id: 1,
    },
  });
};
