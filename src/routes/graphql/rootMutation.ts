import { GraphQLObjectType } from 'graphql';
import { UserType } from './users/users.js';
import { Context } from './types/context.type.js';
import { createUserInput } from './users/inputs.js';
import { PostType } from './posts/posts.js';
import { createPostInput } from './posts/inputs.js';
import { UUID } from 'crypto';
import { ProfileType } from './profiles/profiles.js';
import { createProfileInput } from './profiles/inputs.js';

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
  },
});
