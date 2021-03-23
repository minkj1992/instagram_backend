require('dotenv').config();
import express = require('express');
import {ApolloServer} from 'apollo-server';

import prisma from './prisma';
import {typeDefs, resolvers} from './schema';
import {getUser} from './utils/users';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: err => {
    console.log(err.extensions?.exception);
    return err;
  },
  context: async (req: express.Request) => ({
    ...req,
    prisma,
    loggedInUser: await getUser(prisma, req),
  }),
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({url}) => console.log(`Server is running on ${url}`));
