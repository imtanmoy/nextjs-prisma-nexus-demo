import { queryField } from '@nexus/schema';
import { GetMeResolver } from '../resolvers/queries/auth';

export const GetMe = queryField('getMe', {
  type: 'User',
  resolve: GetMeResolver,
});
