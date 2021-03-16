import jwt from "jsonwebtoken";

function getTokenPayload(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

/**
 *
 * @param {*} req : express.Request
 * @param {*} authToken : Authorization": "Bearer-TOKEN"
 */
export const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { id } = getTokenPayload(token);
      return id;
    }
  } else if (authToken) {
    const { id } = getTokenPayload(authToken);
    return id;
  }

  throw new Error("Not authenticated");
};
