require('dotenv').config();
import express = require('express');
import {ApolloServer} from 'apollo-server';

import prisma from './prisma';
import {typeDefs, resolvers} from './schema';
import {getUser} from './utils/users';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (req: express.Request) => ({
    ...req,
    prisma,
    loggedInUser: await getUser(prisma, req),
  }),
  formatError: err => {
    console.log(err?.extensions?.exception);
    return err;
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({url}) => console.log(`Server is running on ${url}`));
