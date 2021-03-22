import * as jwt from 'jsonwebtoken';
import {Resolver} from '../types';

async function _getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY as jwt.Secret);
}

/**
 *
 * @param {*} req : express.Request
 * @param {*} authToken : Authorization": "Bearer-TOKEN"
 */

async function _getUserId(req) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const verifiedToken: any = await _getTokenPayload(token);
      return 'id' in verifiedToken ? verifiedToken['id'] : null;
    }
  }
  throw new Error('Not authenticated');
}

export async function getUser(prisma, req) {
  const reqType = req.body.operationName || req.body.query;
  console.log(reqType);
  if (reqType === 'IntrospectionQuery') return null;

  try {
    const userId = await _getUserId(req);
    const user = await prisma.user.findUnique({where: {id: userId}});
    return user;
  } catch {
    return null;
  }
}

export const protectAuthResolver = (resolver: Resolver) => (
  root,
  args,
  context,
  info
) => {
  if (!context.loggedInUser) {
    return {ok: false, error: 'Please log in to perform this action'};
  }
  return resolver(root, args, context, info);
};
