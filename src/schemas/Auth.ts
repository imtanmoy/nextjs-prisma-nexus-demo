import { mutationType, stringArg } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";
import { UserInputError } from "apollo-server-errors";

export const AuthMutation = mutationType({
  definition(t: ObjectDefinitionBlock<"Mutation">) {
    t.field("signup", {
      type: "User",
      nullable: false,
      args: {
        name: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_root, { name, email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email: email,
          },
        });
        if (user) {
          return new UserInputError("Validation failed", {
            email: "user with this email already exist",
          });
        }
        return ctx.prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });
      },
    });
  },
});
