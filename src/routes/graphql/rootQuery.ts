import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import {
  memberTypeType,
  memberTypesType,
  MemberTypeId,
} from './memberTypes/memberTypes.js';
import { PostType, PostListType } from './posts/posts.js';
import { Context } from './types/context.type.js';
import { UUIDType } from './types/uuid.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberType: {
      type: memberTypeType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },

      async resolve(parent, args: { id: string }, ctx: Context) {
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

    post: {
      type: PostType,
      args: {
        id: { type: UUIDType },
      },

      async resolve(parent, args: { id: string }, ctx: Context) {
        return await ctx.prisma.post.findUnique({
          where: { id: args.id },
        });
      },
    },

    posts: {
      type: PostListType,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.post.findMany();
      },
    },
  },
});