import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schemas";
import { createContext } from "../../src/context";

const apolloServer = new ApolloServer({
  schema: schema,
  context: createContext,
  tracing: process.env.NODE_ENV === "development",
});
const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
