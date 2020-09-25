import {
  ArgsValue,
  GetGen,
  RootValue,
} from '@nexus/schema/dist/typegenTypeHelpers';

export const FindAllUsersResolver = async (
  root: RootValue<'Query'>,
  args: ArgsValue<'Query', string>,
  ctx: GetGen<'context'>
): Promise<any> => {
  return await ctx.prisma.user.findMany();
};

export const FindUserByIdResolver = async (
  _root: RootValue<'Query'>,
  { id },
  ctx: GetGen<'context'>
): Promise<any> =>
  await ctx.prisma.user.findOne({
    where: {
      id,
    },
  });
