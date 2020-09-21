import { mutationType, stringArg } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";

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
      resolve: (_root, { name, email, password }, ctx) => {
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
