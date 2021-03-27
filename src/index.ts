require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import {ApolloServer} from 'apollo-server-express';

import prisma from './prisma';
import {typeDefs, resolvers} from './schema';
import {getUser} from './utils/users';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(logger('tiny'));
app.use('/static', express.static('uploads'));

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => ({
    ...req,
    prisma,
    loggedInUser: await getUser(prisma, req),
  }),
  formatError: err => {
    console.log(err?.extensions?.exception);
    return err;
  },
});

apollo.applyMiddleware({app});
app.listen({port: PORT}, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
