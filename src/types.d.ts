/* eslint-disable @typescript-eslint/no-explicit-any */
import {PrismaClient, User} from '@prisma/client';

type Context = {
  prisma: PrismaClient;
  loggedInUser?: User;
};

export type ResolverPayload = {
  root: any;
  args: any;
  context: Context;
  info: any;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
