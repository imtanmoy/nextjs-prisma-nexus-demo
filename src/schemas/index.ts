import { queryType, makeSchema, stringArg, objectType } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";
import path from "path";
import { User, JwtAuthUser } from "./allTypes";
import { AuthMutation } from "./Auth";

const Query = queryType({
  definition(t: ObjectDefinitionBlock<"Query">) {
    t.string("hello", {
      args: { name: stringArg({ nullable: true }) },
      resolve: (parent, { name }, ctx) => `Hello ${name || "World"}!`,
    });
  },
});

export const schema = makeSchema({
  types: { Query, User, JwtAuthUser, AuthMutation },
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
