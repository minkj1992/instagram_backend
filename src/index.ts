require('dotenv').config();
import express = require('express');
import {ApolloServer} from 'apollo-server';

import prisma from './prisma';
import schema from './schema';
import {getUser} from './utils/users';

const server = new ApolloServer({
  schema,
  context: async (req: express.Request) => ({
    ...req,
    prisma,
    loggedInUser: await getUser(prisma, req),
  }),
  subscriptions: false,
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({url}) => console.log(`Server is running on ${url}`));
