import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';
import { send } from 'micro';

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
  res,
}: {
  req: any;
  res: any;
}): Context => {
  const { token } = req.cookies;
  let user: ContextUser;

  if (token) {
    try {
      const decoded = verify(token, SECRET_KEY);
      const prismaUser = prisma.user.findOne({
        where: {
          id: decoded['id'],
        },
      });
      if (prismaUser) {
        user = {
          id: decoded['id'],
          email: decoded['email'],
        };
      } else {
        send(res, 401, { message: 'invalid token: user not found' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { prisma, req, res, user };
};
