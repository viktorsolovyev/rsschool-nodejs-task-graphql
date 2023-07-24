import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { UserType } from './users/users.js';
import { Context } from './types/context.type.js';
import { changeUserInput, createUserInput } from './users/inputs.js';
import { PostType } from './posts/posts.js';
import { createPostInput, changePostInput } from './posts/inputs.js';
import { UUID } from 'crypto';
import { ProfileType } from './profiles/profiles.js';
import { changeProfileInput, createProfileInput } from './profiles/inputs.js';
import { UUIDType } from './types/uuid.js';

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

    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, dto: { type: changeUserInput } },
      async resolve(
        root,
        args: { id: UUID; dto: { name: string; balance: number } },
        ctx: Context,
      ) {
        return await ctx.prisma.user.update({ where: { id: args.id }, data: args.dto });
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: UUIDType },
      },
      async resolve(root, args: { id: string }, ctx: Context) {
        try {
          await ctx.prisma.user.delete({ where: { id: args.id } });
        } catch {
          return false;
        }
        return true;
      },
    },

    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      async resolve(root, args: { userId: UUID; authorId: UUID }, ctx: Context) {
        await ctx.prisma.subscribersOnAuthors.create({
          data: { subscriberId: args.userId, authorId: args.authorId },
        });
        return await ctx.prisma.user.findUnique({ where: { id: args.userId } });
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      async resolve(root, args: { userId: UUID; authorId: UUID }, ctx: Context) {
        try {
          await ctx.prisma.subscribersOnAuthors.deleteMany({
            where: { subscriberId: args.userId, authorId: args.authorId },
          });
        } catch {
          return false;
        }
        return true;
      },
    },

    createPost: {
      type: PostType,
      args: {
        dto: { type: createPostInput },
      },
      async resolve(
        root,
        args: { dto: { authorId: UUID; content: string; title: string } },
        ctx: Context,
      ) {
        return await ctx.prisma.post.create({ data: args.dto });
      },
    },

    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, dto: { type: changePostInput } },
      async resolve(
        root,
        args: { id: UUID; dto: { authorId: UUID; content: string; title: string } },
        ctx: Context,
      ) {
        return await ctx.prisma.post.update({ where: { id: args.id }, data: args.dto });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: UUIDType },
      },
      async resolve(root, args: { id: string }, ctx: Context) {
        try {
          await ctx.prisma.post.delete({ where: { id: args.id } });
        } catch {
          return false;
        }
        return true;
      },
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: createProfileInput },
      },
      async resolve(
        root,
        args: {
          dto: {
            userId: UUID;
            memberTypeId: string;
            isMale: boolean;
            yearOfBirth: number;
          };
        },
        ctx: Context,
      ) {
        return await ctx.prisma.profile.create({ data: args.dto });
      },
    },

    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, dto: { type: changeProfileInput } },
      async resolve(
        root,
        args: {
          id: UUID;
          dto: { memberTypeId: string; isMale: boolean; yearOfBirth: number };
        },
        ctx: Context,
      ) {
        return await ctx.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: UUIDType },
      },
      async resolve(root, args: { id: string }, ctx: Context) {
        try {
          await ctx.prisma.profile.delete({ where: { id: args.id } });
        } catch {
          return false;
        }
        return true;
      },
    },
  },
});
