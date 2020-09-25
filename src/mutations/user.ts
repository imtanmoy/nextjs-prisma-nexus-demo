import { intArg, mutationField, stringArg } from "@nexus/schema";

export const UpdateUserById = mutationField("updateUserById", {
  type: "User",
  args: {
    id: intArg({
      description: "id of the user",
    }),
    name: stringArg({
      description: "new name of the user",
    }),
  },
  resolve: async (root, { id, name }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    return await ctx.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  },
});

export const DeleteUserById = mutationField("deleteUserById", {
  type: "User",
  args: {
    id: intArg({
      description: "id of the user",
    }),
  },
  resolve: async (root, { id }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    return await ctx.prisma.user.delete({
      where: {
        id,
      },
    });
  },
});
