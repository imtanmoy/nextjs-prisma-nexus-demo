import {
  ArgsValue,
  GetGen,
  RootValue,
} from '@nexus/schema/dist/typegenTypeHelpers';
import { AuthenticationError } from 'apollo-server-errors';

export const GetMeResolver = async (
  root: RootValue<'Query'>,
  args: ArgsValue<'Query', string>,
  ctx: GetGen<'context'>
): Promise<any> => {
  const { user } = ctx;
  if (!user) {
    throw new AuthenticationError('user must be logged in');
  }

  return await ctx.prisma.user.findOne({
    where: {
      id: user.id,
    },
  });
};
