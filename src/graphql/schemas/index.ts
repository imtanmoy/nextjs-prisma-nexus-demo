import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import path from 'path';
import allTypes from './allTypes';
import mutations from '../mutations';
import queries from '../queries';

export const schema = makeSchema({
  types: {
    allTypes,
    mutations,
    queries,
  },
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), '__generated__/schema.gen.graphql'),
    typegen: path.join(process.cwd(), '__generated__/nexusTypes.gen.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
});
