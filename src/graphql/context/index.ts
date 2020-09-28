import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient({ log: ['query'] });

const SECRET_KEY = 'secret!';

interface ContextUser {
  id: number;
  email: string;
}

export interface Context {
  prisma: PrismaClient;
  req: IncomingMessage;
  res: ServerResponse;
  user?: ContextUser;
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
  const { token } = req.cookies;
  let user: ContextUser = undefined;

  if (token) {
    try {
      const decoded = verify(token, SECRET_KEY);
      user = {
        id: decoded['id'],
        email: decoded['email'],
      };
    } catch (err) {
      console.log(err);
    }
  }

  return { prisma, req, res, user };
};
