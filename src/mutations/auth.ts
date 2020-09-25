import { mutationField, stringArg } from "@nexus/schema";
import {
  signup as signupResolver,
  login as loginResolver,
} from "../resolvers/mutations/auth";

export const signup = mutationField("signup", {
  type: "User",
  args: {
    name: stringArg(),
    email: stringArg(),
    password: stringArg(),
  },
  resolve: signupResolver,
});

export const login = mutationField("login", {
  type: "JwtAuthUser",
  nullable: false,
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  resolve: loginResolver,
});
