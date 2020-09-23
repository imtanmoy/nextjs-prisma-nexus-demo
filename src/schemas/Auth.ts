import { mutationType, stringArg } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";
import { UserInputError } from "apollo-server-errors";
import * as yup from "yup";
import { formatYupError } from "./utils";

const emailNotLongEnough = "email must be at least 3 characters";
const nameNotLongEnough = "name must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 8 characters";
const invalidEmail = "email must be a valid email";

const signupValidator = yup.object().shape({
  name: yup.string().min(3, nameNotLongEnough).max(100),
  email: yup.string().min(3, emailNotLongEnough).max(100).email(invalidEmail),
  password: yup.string().min(8, passwordNotLongEnough).max(100),
});

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
        let errors: Array<{ key: string; message: string }> = [];

        try {
          await signupValidator.validate(
            { name, email, password },
            { abortEarly: false }
          );
        } catch (err) {
          errors = formatYupError(err);
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
