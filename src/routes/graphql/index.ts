import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLError, GraphQLSchema, parse, validate } from 'graphql';
import { rootQuery } from './rootQuery.js';
import { rootMutation } from './rootMutation.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const schema = new GraphQLSchema({
        query: rootQuery,
        mutation: rootMutation,
      });

      const validationErrors: readonly GraphQLError[] = validate(schema, parse(query), [
        depthLimit(5),
      ]);
      if (validationErrors.length) return { data: '', errors: validationErrors };

      const res = await graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });
      return res;
    },
  });
};

export default plugin;
