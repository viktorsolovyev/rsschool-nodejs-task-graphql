import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { memberTypeType, memberTypesType, MemberTypeId } from './memberTypes/memberTypes.js';
import { Context } from './types/context.type.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberType: {
      type: memberTypeType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },

      async resolve(parent, args: { id: string }, ctx: Context) {
        console.log(args.id);
        return await ctx.prisma.memberType.findUnique({
          where: { id: args.id },
        });
      },
    },

    memberTypes: {
      type: memberTypesType,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.memberType.findMany();
      },
    },
  },
});
