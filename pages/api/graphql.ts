import { ApolloServer } from "apollo-server-micro";
import { schema } from "schemas/schema";

const apolloServer = new ApolloServer({ schema });
const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
