import jwt from "jsonwebtoken";

export const createToken = (obj) => {
  let token = jwt.sign(obj, process.env.WEBTOKEN_SALTKEY);
  return token;
};

export const parseToken = (token) => {
  try {
    let parsed = jwt.verify(token.split(" ")[1], process.env.WEBTOKEN_SALTKEY);
    return parsed;
  } catch (e) {
    console.log("Invalid Token");
    return null;
  }
};
