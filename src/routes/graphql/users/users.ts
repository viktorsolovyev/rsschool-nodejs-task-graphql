import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

const userFields = {
  id: { type: UUIDType },
  name: { type: GraphQLString },
  balance: { type: GraphQLFloat },
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => userFields,
});

export const UserListType = new GraphQLList(UserType);
