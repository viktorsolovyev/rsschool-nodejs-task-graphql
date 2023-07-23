import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId, memberTypeType } from '../member-types/memberTypes.js';
import { Context } from '../types/context.type.js';

type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

const profileFields = {
  id: { type: UUIDType },
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  userId: { type: UUIDType },
  memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  memberType: {
    type: memberTypeType,
    async resolve({ memberTypeId }: Profile, args, ctx: Context) {
      return await ctx.prisma.memberType.findUnique({
        where: { id: memberTypeId },
      });
    },
  },
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => profileFields,
});

export const ProfileListType = new GraphQLList(ProfileType);
