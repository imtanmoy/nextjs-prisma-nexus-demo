import { intArg, mutationField, queryField, stringArg } from "@nexus/schema";

export const GetMe = queryField("getMe", {
  type: "User",
  resolve: async (root, args, ctx) => {
    return await ctx.prisma.user.findOne({
      where: {
        id: 1,
      },
    });
  },
});

export const FindUserById = queryField("userById", {
  type: "User",
  args: {
    id: intArg({
      description: "id of the user",
    }),
  },
  resolve: async (root, { id }, ctx) =>
    await ctx.prisma.user.findOne({
      where: {
        id,
      },
    }),
});

export const FindAllUsers = queryField("allUsers", {
  type: "User",
  list: true,
  resolve: async (root, args, ctx) => {
    const users = await ctx.prisma.user.findMany();
    console.log(users);
    return users;
  },
});

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
