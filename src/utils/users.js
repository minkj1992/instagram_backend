import { prisma } from ".prisma/client";
import jwt from "jsonwebtoken";

async function _getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
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
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { id } = await _getTokenPayload(token);
      return id;
    }
  }
  throw new Error("Not authenticated");
}

export async function getUser(prisma, req) {
  const reqType = req.body.operationName || req.body.query;
  console.log(reqType);
  try {
    const userId = await _getUserId(req);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch {
    return null;
  }
}

export const protectAuthResolver = (user) => {
  if (!user) {
    return {
      ok: false,
      error: "You need to login",
    };
  }
};
