import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

export interface Context {
  prisma: PrismaClient;
}

export const createContext = ({ req, connection, res }): Context => {
  // console.log(req);
  // console.log(connection);
  // console.log(res);
  return { prisma };
};
