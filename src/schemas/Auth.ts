import { mutationType, stringArg } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";
import { UserInputError } from "apollo-server-errors";
import validator from "validator";

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
        let errors = [];

        if (name === null || email === undefined || email === "") {
          errors.push({
            key: "name",
            message: "Name must not be empty.",
          });
        }

        if (email === null || email === undefined) {
          errors.push({
            key: "email",
            message: "The email address must not be empty.",
          });
        } else if (!validator.isLength(email, { max: 250 })) {
          errors.push({
            key: "email",
            message: "The email must be at a maximum 250 characters long.",
          });
        } else if (!validator.isEmail(email)) {
          errors.push({
            key: "email",
            message: "The email is not valid.",
          });
        }
        if (password === null || password === undefined) {
          errors.push({
            key: "password",
            message: "The password filed must not be empty.",
          });
        } else if (!validator.isLength(password, { min: 6 })) {
          errors.push({
            key: "password",
            message: "The password must be at a minimum 6 characters long.",
          });
        }
        if (errors.length)
          throw new UserInputError("Validation error", { errors });

        const user = await ctx.prisma.user.findOne({
          where: {
            email: email,
          },
        });

        if (user) {
          errors.push({
            key: "email",
            message: "user with this email already exist",
          });
          if (errors.length)
            throw new UserInputError("User already exists", { errors });
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
