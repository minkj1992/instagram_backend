import express = require('express');
import {PrismaClient} from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import {ResolverPayload, Resolver} from '../types';

async function _getTokenPayload(token: string): Promise<string | object> {
  return jwt.verify(token, process.env.SECRET_KEY as jwt.Secret);
}

/**
 *
 * @param {*} req : express.Request
 * @param {*} authToken : Authorization": "Bearer-TOKEN"
 */

async function _getUserId(req: express.Request) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const verifiedToken = await _getTokenPayload(token);
      return verifiedToken ? (verifiedToken as {id: string})['id'] : null;
    }
  }
  throw new Error('Not authenticated');
}

export async function getUser(prisma: PrismaClient, req: express.Request) {
  const reqType = req?.body?.operationName || req?.body?.query;

  if (reqType === 'IntrospectionQuery' || !reqType) return null;

  const userId = await _getUserId(req);
  if (!userId) return null;
  const user = await prisma.user.findUnique({where: {id: +userId}});
  return user;
}

export function protectAuthResolver(resolver: Resolver) {
  return function (...payload: ResolverPayload) {
    const [_, __, context] = payload;
    if (!context.loggedInUser) {
      return {ok: false, error: 'Please log in to perform this action'};
    }
    return resolver(...payload);
  };
}
