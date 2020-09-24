import { makeSchema } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import path from "path";
import { User, JwtAuthUser } from "./allTypes";
import { AuthMutation } from "./Auth";
import {
  DeleteUserById,
  FindAllUsers,
  FindUserById,
  GetMe,
  UpdateUserById,
} from "./User";

export const schema = makeSchema({
  types: {
    User,
    JwtAuthUser,
    AuthMutation,
    GetMe,
    FindUserById,
    FindAllUsers,
    UpdateUserById,
    DeleteUserById,
  },
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), "__generated__/schema.gen.graphql"),
    typegen: path.join(process.cwd(), "__generated__/nexusTypes.gen.ts"),
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("../context"),
        alias: "Context",
      },
    ],
  },
});
