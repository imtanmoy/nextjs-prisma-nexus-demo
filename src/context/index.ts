import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";

const prisma = new PrismaClient({ log: ["query"] });

export interface Context {
  prisma: PrismaClient;
  req: IncomingMessage;
  res: ServerResponse;
}

export const createContext = ({ req, connection, res }): Context => {
  // console.log(req);
  // console.log(connection);
  // console.log(res);
  return { prisma, req, res };
};
