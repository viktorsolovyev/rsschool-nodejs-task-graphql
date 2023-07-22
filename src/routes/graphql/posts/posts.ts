import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

const postFields = {
  id: { type: UUIDType },
  title: { type: GraphQLString },
  content: { type: GraphQLString },
  authorId: { type: UUIDType },
};

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => postFields,
});

export const PostListType = new GraphQLList(PostType);
