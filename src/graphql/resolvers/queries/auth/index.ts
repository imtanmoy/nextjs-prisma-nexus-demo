import {
  ArgsValue,
  GetGen,
  RootValue,
} from '@nexus/schema/dist/typegenTypeHelpers';

export const GetMeResolver = async (
  root: RootValue<'Query'>,
  args: ArgsValue<'Query', string>,
  ctx: GetGen<'context'>
): Promise<any> => {
  return await ctx.prisma.user.findOne({
    where: {
      id: 1,
    },
  });
};
