import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getAnimalById, getAnimals } from '../../../database/animals';

const typeDefs = gql`
  type Animal {
    id: ID!
    firstName: String!
    type: String!
    accessory: String
  }

  type Query {
    animals: [Animal]
    animal(id: ID): Animal
  }
`;

const resolvers = {
  Query: {
    animals: async () => await getAnimals(),

    animal: (parent: null, args: { id: string }) => {
      return getAnimalById(parseInt(args.id));
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

type RequestBody = NextRequest | NextResponse;

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(
  req: NextRequest,
  res: NextResponse,
): Promise<NextResponse<RequestBody>> {
  return await handler(req, res);
}

export async function POST(
  req: NextRequest,
  res: NextResponse,
): Promise<NextResponse<RequestBody>> {
  return await handler(req, res);
}
