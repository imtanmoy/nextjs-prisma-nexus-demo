import { queryType, makeSchema, stringArg } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";
import path from "path";

const Query = queryType({
  definition(t: ObjectDefinitionBlock<"Query">) {
    t.string("hello", {
      args: { name: stringArg({ nullable: true }) },
      resolve: (parent, { name }) => `Hello ${name || "World"}!`,
    });
  },
});

export const schema = makeSchema({
  types: { Query },
  outputs: {
    schema: path.join(process.cwd(), "__generated__/schema.gen.graphql"),
    typegen: path.join(process.cwd(), "__generated__/nexusTypes.gen.ts"),
  },
});
