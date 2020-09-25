import { objectType } from '@nexus/schema';
import { ObjectDefinitionBlock } from '@nexus/schema/dist/definitions/objectType';

export const JwtAuthUser = objectType({
  name: 'JwtAuthUser',
  definition(t: ObjectDefinitionBlock<'JwtAuthUser'>) {
    t.string('token');
    t.field('user', {
      type: 'User',
    });
  },
});
