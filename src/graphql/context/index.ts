import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

const prisma = new PrismaClient({ log: ['query'] });

export interface Context {
  prisma: PrismaClient;
  req: IncomingMessage;
  res: ServerResponse;
}

export const createContext = ({
  req,
  connection,
  res,
}: {
  res: any;
  connection: any;
  req: any;
}): Context => {
  return { prisma, req, res };
};
