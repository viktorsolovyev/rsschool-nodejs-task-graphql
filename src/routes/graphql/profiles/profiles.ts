import {
  GraphQLBoolean,  
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../member-types/memberTypes.js';

const profileFields = {
  id: { type: UUIDType },
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  userId: { type: UUIDType },
  memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => profileFields,
});

export const ProfileListType = new GraphQLList(ProfileType);
