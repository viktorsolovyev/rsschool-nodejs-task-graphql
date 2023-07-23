import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profiles/profiles.js';
import { Context } from '../types/context.type.js';
import { PostListType } from '../posts/posts.js';

type User = {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: User[];
  subscribedToUser?: User[];
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      async resolve({ id }: User, args, ctx: Context) {
        return await ctx.prisma.profile.findUnique({
          where: { userId: id },
        });
      },
    },
    posts: {
      type: PostListType,
      async resolve({ id }: User, args, ctx: Context) {
        return await ctx.prisma.post.findMany({
          where: { authorId: id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve({ id }: User, args, ctx: Context) {
        const records = await ctx.prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          include: {
            author: true,
          },
        });
        return records.map((rec) => rec.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve({ id }: User, args, ctx: Context) {
        const records = await ctx.prisma.subscribersOnAuthors.findMany({
          where: { authorId: id },
          include: {
            subscriber: true,
          },
        });
        return records.map((rec) => rec.subscriber);
      },
    },
  }),
});

export const UserListType = new GraphQLList(UserType);
