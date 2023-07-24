import { GraphQLObjectType } from 'graphql';
import { UserType } from './users/users.js';
import { Context } from './types/context.type.js';
import { createUserInput } from './users/inputs.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: createUserInput },
      },
      async resolve(
        root,
        args: { dto: { name: string; balance: number } },
        ctx: Context,
      ) {
        return await ctx.prisma.user.create({ data: args.dto });
      },
    },
  },
});
