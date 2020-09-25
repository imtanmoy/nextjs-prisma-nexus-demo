import { intArg, queryField } from '@nexus/schema';
import {
  FindAllUsersResolver,
  FindUserByIdResolver,
} from '../resolvers/queries/user';

export const FindUserById = queryField('userById', {
  type: 'User',
  args: {
    id: intArg({
      description: 'id of the user',
    }),
  },
  resolve: FindUserByIdResolver,
});

export const FindAllUsers = queryField('allUsers', {
  type: 'User',
  list: true,
  resolve: FindAllUsersResolver,
});
