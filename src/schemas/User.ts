import { objectType } from "@nexus/schema";
import { ObjectDefinitionBlock } from "@nexus/schema/dist/definitions/objectType";

export const User = objectType({
  name: "User",
  definition(t: ObjectDefinitionBlock<"User">) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
  },
});
